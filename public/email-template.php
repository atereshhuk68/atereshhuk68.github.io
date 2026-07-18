<?php

/**
 * BFancy contact-form notification email (HTML).
 * All brand tokens are inlined as literal values — email clients
 * (Gmail, Outlook) do not support CSS custom properties.
 */
function render_email_template(array $d): string {
	$e = fn($s) => htmlspecialchars($s ?? '', ENT_QUOTES, 'UTF-8');

	$isOffer = ($d['formTitle'] ?? '') === 'offer';
	$eyebrow = $isOffer ? 'Спеціальна пропозиція' : "Форма зворотного зв'язку";
	$intro = $isOffer
		? 'Хтось скористався спеціальною пропозицією на сайті BFancy. Деталі нижче.'
		: 'Хтось заповнив контактну форму на сайті BFancy. Деталі нижче.';

	$none = '<span style="color:#999ea5;font-style:italic;">(порожньо)</span>';

	$langLabels = ['uk' => 'Українська', 'pl' => 'Польська', 'en' => 'Англійська'];
	$langCode = $d['userLang'] ?? '';
	$lang = $langLabels[$langCode] ?? $langCode;
	$link = fn(string $href, string $text) => '<a href="' . $href . '" style="color:#5b76b5;text-decoration:none;word-break:break-all;">' . $text . '</a>';

	$field = function (string $label, string $valueHtml, bool $last = false): string {
		$pad = $last ? '' : 'padding-bottom:20px;';
		return '<tr><td style="' . $pad . '">'
			. '<p style="margin:0 0 4px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#667a91;">' . $label . '</p>'
			. '<p style="margin:0;font-size:16px;line-height:1.5;color:#333c47;">' . $valueHtml . '</p>'
			. '</td></tr>';
	};

	$rows = $field("Ім'я", $d['userName'] ? '<strong>' . $e($d['userName']) . '</strong>' : $none);
	$rows .= $field('Телефон', $d['userPhone'] ? $link('tel:' . $e($d['userPhone']), $e($d['userPhone'])) : $none);
	$rows .= $field('E-mail', $d['userEmail'] ? $link('mailto:' . $e($d['userEmail']), $e($d['userEmail'])) : $none);

	if (!empty($d['userServiceCategory'])) {
		$rows .= $field('Послуга', $e($d['userServiceCategory']));
	}

	$rows .= $field('Повідомлення', $d['userMessage'] ? nl2br($e($d['userMessage'])) : $none);

	if ($lang) {
		$rows .= $field('Мова користувача', $e($lang));
	}

	$rows .= $field('Джерело', $d['refererUrl'] ? $link($e($d['refererUrl']), $e($d['refererUrl'])) : $none, true);

	$received = date('d.m.Y H:i');
	$font = "font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;";

	return <<<HTML
<!doctype html>
<html lang="uk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Нове повідомлення — BFancy</title>
</head>
<body style="margin:0;padding:0;background:#eceff2;{$font}font-size:14px;line-height:1.571;color:#333c47;">

<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;opacity:0;">Нове повідомлення з форми — {$e($d['userName'])}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;background:#eceff2;margin:0;padding:0;">
<tr>
<td align="center" style="padding:32px 20px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;width:600px;max-width:600px;background:#fefefe;border:1px solid #e1e4e8;border-radius:8px;overflow:hidden;">

<!-- Header -->
<tr>
<td style="padding:24px 32px;text-align:center;border-bottom:1px solid #d5dbe2;">
<span style="{$font}font-weight:600;font-size:18px;letter-spacing:-0.01em;color:#333c47;white-space:nowrap;">BFancy</span>
</td>
</tr>

<!-- Hero -->
<tr>
<td style="padding:32px 32px 20px;text-align:center;background:#333c47;">
<span style="display:block;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.16em;font-size:12px;font-weight:600;color:#ffce6b;">{$eyebrow}</span>
<h3 style="margin:0;{$font}font-size:26px;line-height:1.25;font-weight:600;color:#fefefe;">Нове повідомлення</h3>
<p style="margin:12px auto 0;max-width:44ch;font-size:16px;line-height:1.55;color:#d5dbe2;">{$intro}</p>
</td>
</tr>

<!-- Fields -->
<tr>
<td style="padding:24px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;">
{$rows}
</table>
</td>
</tr>

<!-- Divider -->
<tr>
<td style="padding:0 32px;">
<div style="height:1px;background:#d5dbe2;"></div>
</td>
</tr>

<!-- Meta -->
<tr>
<td style="padding:20px 32px 32px;">
<p style="margin:0;font-size:12px;color:#999ea5;line-height:1.5;">
Отримано: <span style="color:#667a91;">{$received}</span>
</p>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:24px 32px;background:#e8ebef;border-top:1px solid #e1e4e8;text-align:center;">
<p style="margin:0 0 4px;font-size:12px;color:#999ea5;line-height:1.5;">BFancy &middot; Салон краси</p>
<p style="margin:0;font-size:12px;line-height:1.5;"><a href="https://bfancy.pl" style="color:#5b76b5;text-decoration:none;">bfancy.pl</a></p>
</td>
</tr>

</table>
</td>
</tr>
</table>

</body>
</html>
HTML;
}
