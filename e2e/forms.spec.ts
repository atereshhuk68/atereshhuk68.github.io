import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { firefox, type Browser, type Page } from "playwright";

const BASE = "http://localhost:4321";
const VALID_PHONE = "48123456789";

const LOCALES = [
  { path: "/", locale: "pl" },
  { path: "/en/", locale: "en" },
  { path: "/uk/", locale: "uk" },
  { path: "/ru/", locale: "ru" },
] as const;

let browser: Browser;

beforeAll(async () => {
  browser = await firefox.launch({ headless: true });
});

afterAll(async () => {
  await browser.close();
});

async function newPage(): Promise<Page> {
  return await browser.newPage({ baseURL: BASE });
}

async function suppressOfferDialog(page: Page) {
  await page.context().addCookies([
    { name: "specialOffer", value: "true", domain: "localhost", path: "/" },
  ]);
}

async function mockSendPhp(page: Page, success: boolean) {
  await page.route("**/send.php", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ success }),
    });
  });
}

async function errorText(page: Page, formSelector: string, field: string) {
  return page.locator(`${formSelector} [data-error="${field}"]`).textContent();
}

async function waitForDialog(page: Page, id: string, timeout = 5000) {
  await page
    .locator(`${id} dialog[open]`)
    .waitFor({ state: "attached", timeout });
}

async function countDialog(page: Page, id: string) {
  return page.locator(`${id} dialog[open]`).count();
}

const CF = "form[data-contact-form]";
const SOF = "form[data-special-offer-form]";

async function createContactPage() {
  const p = await newPage();
  await suppressOfferDialog(p);
  return p;
}

async function createOfferPage() {
  const p = await newPage();
  return p;
}

describe("ContactForm validation", () => {
  test("shows errors on empty submit", async () => {
    const page = await createContactPage();
    await page.goto("/");
    await page.locator(`${CF} button[type="submit"]`).click();

    for (const field of ["userName", "userPhone", "userEmail", "userMessage"]) {
      const text = await errorText(page, CF, field);
      expect(text?.length).toBeGreaterThan(0);
      const invalid = await page
        .locator(`${CF} [name="${field}"]`)
        .getAttribute("aria-invalid");
      expect(invalid).toBe("true");
    }
    await page.close();
  });

  test("rejects name with numbers", async () => {
    const page = await createContactPage();
    await page.goto("/");
    await page.locator(`${CF} [name="userName"]`).fill("Anna123");
    await page.locator(`${CF} button[type="submit"]`).click();
    await page.waitForTimeout(500);

    const text = await errorText(page, CF, "userName");
    expect(text?.length).toBeGreaterThan(0);
    await page.close();
  });

  test("rejects short name", async () => {
    const page = await createContactPage();
    await page.goto("/");
    await page.locator(`${CF} [name="userName"]`).fill("A");
    await page.locator(`${CF} button[type="submit"]`).click();

    const text = await errorText(page, CF, "userName");
    expect(text?.length).toBeGreaterThan(0);
    await page.close();
  });

  test("rejects invalid email", async () => {
    const page = await createContactPage();
    await page.goto("/");
    await page.locator(`${CF} [name="userEmail"]`).fill("not-an-email");
    await page.locator(`${CF} button[type="submit"]`).click();

    const text = await errorText(page, CF, "userEmail");
    expect(text?.length).toBeGreaterThan(0);
    await page.close();
  });

  test("rejects incomplete phone", async () => {
    const page = await createContactPage();
    await page.goto("/");
    await page
      .locator(`${CF} [name="userPhone"]`)
      .pressSequentially("123");
    await page.locator(`${CF} button[type="submit"]`).click();

    const text = await errorText(page, CF, "userPhone");
    expect(text?.length).toBeGreaterThan(0);
    await page.close();
  });

  test("clears errors on input", async () => {
    const page = await createContactPage();
    await page.goto("/");
    await page.locator(`${CF} button[type="submit"]`).click();

    const nameError = page.locator(`${CF} [data-error="userName"]`);
    expect((await nameError.textContent())?.length).toBeGreaterThan(0);

    const nameInput = page.locator(`${CF} [name="userName"]`);
    await nameInput.fill("Anna");

    expect(await nameError.textContent()).toBe("");
    expect(await nameInput.getAttribute("aria-invalid")).toBeNull();
    await page.close();
  });
});

describe("ContactForm submission", () => {
  test("submits and shows success dialog", async () => {
    const page = await createContactPage();
    await mockSendPhp(page, true);
    await page.goto("/");

    const form = page.locator(CF);
    await form.locator('[name="userName"]').fill("Anna");
    await form
      .locator('[name="userPhone"]')
      .pressSequentially(VALID_PHONE);
    await form.locator('[name="userEmail"]').fill("anna@example.com");
    await form.locator('[name="userMessage"]').fill("Hello!");
    await form.locator('button[type="submit"]').click();

    await waitForDialog(page, "#successModal");
    expect(await countDialog(page, "#successModal")).toBe(1);
    await page.close();
  });

  test("shows error dialog on submit failure", async () => {
    const page = await createContactPage();
    await mockSendPhp(page, false);
    await page.goto("/");

    const form = page.locator(CF);
    await form.locator('[name="userName"]').fill("Anna");
    await form
      .locator('[name="userPhone"]')
      .pressSequentially(VALID_PHONE);
    await form.locator('[name="userEmail"]').fill("anna@example.com");
    await form.locator('[name="userMessage"]').fill("Hello!");
    await form.locator('button[type="submit"]').click();

    await waitForDialog(page, "#errorModal");
    expect(await countDialog(page, "#errorModal")).toBe(1);
    await page.close();
  });
});

describe("SpecialOffer dialog", () => {
  test("auto-opens on page load", async () => {
    const page = await createOfferPage();
    await page.goto("/");
    await page.waitForTimeout(3000);

    await waitForDialog(page, "#specialOfferDialog");
    expect(await countDialog(page, "#specialOfferDialog")).toBe(1);
    await page.close();
  });

  test("does not open if cookie is set", async () => {
    const page = await createOfferPage();
    await suppressOfferDialog(page);
    await page.goto("/");
    await page.waitForTimeout(3000);
    expect(await countDialog(page, "#specialOfferDialog")).toBe(0);
    await page.close();
  });

  test("close button sets cookie and closes dialog", async () => {
    const page = await createOfferPage();
    await page.goto("/");
    await page.waitForTimeout(3000);
    expect(await countDialog(page, "#specialOfferDialog")).toBe(1);

    await page.locator(`${SOF} button[type="button"]`).click();
    await page.waitForTimeout(500);

    expect(await countDialog(page, "#specialOfferDialog")).toBe(0);

    const cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === "specialOffer")?.value).toBe("true");
    await page.close();
  });
});

describe("SpecialOffer form", () => {
  test("shows validation errors on empty submit", async () => {
    const page = await createOfferPage();
    await page.goto("/");
    await waitForDialog(page, "#specialOfferDialog");

    await page.locator(`${SOF} button[type="submit"]`).click();
    await page.waitForTimeout(500);

    for (const field of ["userName", "userPhone"]) {
      const text = await errorText(page, SOF, field);
      expect(text?.length).toBeGreaterThan(0);
    }
    await page.close();
  });

  test("submits and shows success dialog", async () => {
    const page = await createOfferPage();
    await mockSendPhp(page, true);
    await page.goto("/");
    await page.waitForTimeout(3000);

    const form = page.locator(SOF);
    await form.locator('[name="userName"]').fill("Anna");
    await form
      .locator('[name="userPhone"]')
      .pressSequentially(VALID_PHONE);
    await form
      .locator('[name="userServiceCategory"]')
      .selectOption({ index: 1 });

    await form.locator('button[type="submit"]').click();

    await waitForDialog(page, "#successModal");
    expect(await countDialog(page, "#successModal")).toBe(1);
    await page.close();
  });
});

describe("i18n form placeholders", () => {
  for (const { path, locale } of LOCALES) {
    test(`contact form in ${locale}`, async () => {
      const page = await createContactPage();
      await page.goto(path);

      const placeholder = await page
        .locator(`${CF} [name="userName"]`)
        .getAttribute("placeholder");
      expect(placeholder).toBeTruthy();
      await page.close();
    });
  }
});

describe("phone mask", () => {
  test("formats phone as +48 pattern", async () => {
    const page = await createContactPage();
    await page.goto("/");

    const phoneInput = page.locator(`${CF} [name="userPhone"]`);
    await phoneInput.pressSequentially(VALID_PHONE);

    const value = await phoneInput.inputValue();
    expect(value).toContain("+48");
    expect(value).toContain(" ");
    await page.close();
  });

  test("submits phone without mask characters", async () => {
    const page = await createContactPage();
    await mockSendPhp(page, true);
    await page.goto("/");

    let postedBody = "";
    await page.route("**/send.php", async (route) => {
      postedBody = route.request().postData() ?? "";
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    const form = page.locator(CF);
    await form.locator('[name="userName"]').fill("Anna");
    await form
      .locator('[name="userPhone"]')
      .pressSequentially(VALID_PHONE);
    await form.locator('[name="userEmail"]').fill("anna@example.com");
    await form.locator('[name="userMessage"]').fill("Hello!");
    await form.locator('button[type="submit"]').click();
    await waitForDialog(page, "#successModal");

    expect(postedBody).toContain(VALID_PHONE);
    expect(postedBody).not.toContain("+48");
    await page.close();
  });
});
