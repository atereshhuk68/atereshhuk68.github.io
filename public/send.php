<?php
$response = array();

$inputs = array(
	'formTitle'                => '',
	'userName'                 => '',
	'userPhone'                => '',
	'userEmail'                => '',
	'userServiceCategory'      => '',
	'userMessage'              => '',
);

/**
 * Sanitizes input data by trimming whitespace and removing backslashes.
 *
 * @param mixed $data The input data to sanitize. It's expected to be a string,
 *                    but the function will attempt to process other types as well.
 * @return mixed The sanitized data. Returns the processed data after trimming
 *               whitespace from the beginning and end, and removing backslashes.
 */
function sanitize_input( $data ) {
	$data = trim( $data );
	$data = stripslashes( $data );
	$data = htmlspecialchars( $data, ENT_QUOTES, 'UTF-8' );

	return $data;
}

/**
 * Checks if a specific field exists and is not empty in the $_POST superglobal.
 *
 * @param string $field_name The name of the field to check.
 * @return bool True if the field exists and is not empty, false otherwise.
 */
function field_exist_and_not_empty( $field_name ) {
	return isset( $_POST[ $field_name ] ) && ! empty( $_POST[ $field_name ] );
}

function is_email( $email ) {
	$pattern = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/';
	return filter_var($email, FILTER_VALIDATE_EMAIL) && preg_match($pattern, $email);
}

/**
 * Checks if a string contains only digits.
 *
 * @param string $phone_number The string to check.
 * @return bool True if the string contains only digits, false otherwise.
 */
function is_phone_number( $phone_number ) {
	$pattern = '/^\+?\d+$/';
	return preg_match( $pattern, $phone_number );
}

/**
 * Validates the form submission data from the $_POST.
 *
 * @return bool True if validation passes for all checked fields, false otherwise.
 */
function form_validation() {
	global $response, $inputs;

	$is_valid = false;

    $inputs['formTitle'] = isset($_POST['formTitle']) ? sanitize_input($_POST['formTitle']) : '';

	if ( field_exist_and_not_empty( 'userName' ) ) {
		$inputs['userName'] = sanitize_input( $_POST['userName'] );
	}

	if ( field_exist_and_not_empty( 'userServiceCategory' ) ) {
		$inputs['userServiceCategory'] = sanitize_input( $_POST['userServiceCategory'] );
	}

	if ( field_exist_and_not_empty( 'userPhone' ) ) {
		if ( is_phone_number( $_POST['userPhone'] ) ) {
			$inputs['userPhone'] = sanitize_input( $_POST['userPhone'] );
		} else {
			array_push( $response, array( 'userPhone' => 'Invalid phone number format' ) );
		}
    }

	if ( field_exist_and_not_empty( 'userEmail' ) ) {
		if ( is_email( $_POST['userEmail'] ) ) {
			$inputs['userEmail'] = sanitize_input( $_POST['userEmail'] );
		} else {
			array_push( $response, array( 'userEmail' => 'Invalid email format' ) );
		}
	}

	if ( field_exist_and_not_empty( 'userMessage' ) ) {
		$inputs['userMessage'] = sanitize_input( $_POST['userMessage'] );
	}

	if ( empty( $response ) ) {
		$is_valid = true;
	}

	return $is_valid;
}

/**
 * Class ContactMessageFormatter
 * Утиліта для форматування повідомлень для різних платформ
 */
class ContactMessageFormatter {
    private $data;

    public function __construct(array $data) {
        $this->data = $data;
    }

    /**
     * Форматує повідомлення для HTML (email)
     */
    public function toHtml(): string {
        $template = '
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2 style="color: #333;">%formTitle%</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>👤 Персона:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">%userName%</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>📧 Пошта:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">%userEmail%</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>📱 Телефон:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">%userPhone%</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>💅🏻 Категорія, яку обрав користувач:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">%userServiceCategory%</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>💬 Повідомлення:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">%userMessage%</td>
                    </tr>
                </table>
            </div>';

        return $this->replacePlaceholders($template, [
            '%formTitle%' => 'offer' === $this->data['formTitle'] ? "💥 Спеціальна пропозиція" : "💌 Нове повідомлення з форми зворотного зв'язку",
            '%userName%' => htmlspecialchars($this->data['userName'] ?? '', ENT_QUOTES, 'UTF-8'),
            '%userEmail%' => htmlspecialchars($this->data['userEmail'] ?? '', ENT_QUOTES, 'UTF-8'),
            '%userPhone%' => htmlspecialchars($this->data['userPhone'] ?? '', ENT_QUOTES, 'UTF-8'),
            '%userServiceCategory%' => htmlspecialchars($this->data['userServiceCategory'] ?? '', ENT_QUOTES, 'UTF-8'),
            '%userMessage%' => nl2br(htmlspecialchars($this->data['userMessage'] ?? '', ENT_QUOTES, 'UTF-8'))
        ]);
    }

    /**
     * Форматує повідомлення для Telegram (MarkdownV2)
     */
    public function toMarkdownV2(): string {
        $isFormTypeOffer = 'offer' === $this->data['formTitle'];

        $template = $isFormTypeOffer ? "💥 *Спеціальна пропозиція*\n\n" : "💌 *Нове повідомлення з форми зворотного зв'язку*\n\n";
        $template .= "*👤 Персона:* %userName%\n";
        $template .= "*📱 Номер телефону:* %userPhone%\n";
        $template .= "*💅🏻 Категорія, яку обрав користувач:* %userServiceCategory%\n";

        if (!$isFormTypeOffer) {
            $template .= "*📧 Пошта:* %userEmail%\n";
            $template .= "*💬 Повідомлення:* %userMessage%";

            return $this->replacePlaceholders($template, [
                '%userName%' => $this->escapeMarkdownV2($this->data['userName'] ?? ''),
                '%userPhone%' => $this->escapeMarkdownV2($this->data['userPhone'] ?? ''),
                '%userEmail%' => $this->escapeMarkdownV2($this->data['userEmail'] ?? ''),
                '%userServiceCategory%' => $this->escapeMarkdownV2($this->data['userServiceCategory'] ?? ''),
                '%userMessage%' => $this->escapeMarkdownV2($this->data['userMessage'] ?? '')
            ]);
        }

        return $this->replacePlaceholders($template, [
            '%userName%' => $this->escapeMarkdownV2($this->data['userName'] ?? ''),
            '%userPhone%' => $this->escapeMarkdownV2($this->data['userPhone'] ?? ''),
            '%userServiceCategory%' => $this->escapeMarkdownV2($this->data['userServiceCategory'] ?? ''),
        ]);
    }

    /**
     * Замінює плейсхолдери в шаблоні
     */
    private function replacePlaceholders(string $template, array $replacements): string {
        return str_replace(array_keys($replacements), array_values($replacements), $template);
    }

    /**
     * Екранує спеціальні символи для MarkdownV2
     */
    private function escapeMarkdownV2(string $text): string {
        $text = strip_tags($text);

        $specialChars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];

        foreach ($specialChars as $char) {
            $text = str_replace($char, '\\' . $char, $text);
        }

        return $text;
    }
}

/**
 * Class NotificationSender
 * Утиліта для відправки повідомлень через різні канали
 */
class NotificationSender {
    private $config;

    public function __construct(array $config = []) {
        $this->config = array_merge([
            'telegram' => [
                'bot_token' => 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                'chat_id' => 'XXXXXXXXX'
            ],
            'email' => [
                'to' => 'kontakt@bfancy.pl',
                'subject_prefix' => 'BFancy | 💌 New Message'
            ]
        ], $config);
    }

    /**
     * Відправляє повідомлення через Telegram
     */
    public function sendTelegram(string $message): bool {
        $url = "https://api.telegram.org/bot{$this->config['telegram']['bot_token']}/sendMessage";

        $data = [
            'chat_id' => $this->config['telegram']['chat_id'],
            'text' => $message,
            'parse_mode' => 'MarkdownV2',
            'disable_web_page_preview' => true,
        ];

        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data),
            ],
        ];

        $context = stream_context_create($options);
        $result = @file_get_contents($url, false, $context);

        if ($result === false) {
            return false;
        }

        $response = json_decode($result, true);
        return isset($response['ok']) && $response['ok'];
    }

    /**
     * Відправляє email
     */
    public function sendEmail(string $message, array $fromData): bool {
        $to = $this->config['email']['to'];
        $subject = $this->config['email']['subject_prefix'] . ' | Від ' . ($fromData['userName'] ?? 'Невідомий');

        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8\r\n";
        $headers .= 'From: <' . ($fromData['userEmail'] ?? 'noreply@example.com') . '>' . "\r\n";

        return mail($to, $subject, $message, $headers);
    }

    /**
     * Відправляє повідомлення через всі доступні канали
     */
    public function sendAll(ContactMessageFormatter $formatter, array $fromData): array {
        $results = [];

        $telegramMessage = $formatter->toMarkdownV2();
        $results['telegram'] = $this->sendTelegram($telegramMessage);

        if (!$results['telegram']) {
            $emailMessage = $formatter->toHtml();
            $results['email'] = $this->sendEmail($emailMessage, $fromData);
        } else {
        }

        return $results;
    }
}

/**
 * Sends a JSON success response.
 * Sets the content type header, encodes the data, echoes it, and exits.
 *
 * @param mixed $data The data to include in the JSON response.
 * @param int $status_code Optional HTTP status code (e.g., 400, 500). Default is 200.
 */
function json_success( $data = null, $status_code = 200 ) {
	header( 'Content-Type: application/json' );
	http_response_code($status_code);
	echo json_encode( array( 'success' => true ) );
	exit;
}

/**
 * Sends a JSON error response.
 * Sets the content type header, encodes the error message/data, echoes it, and exits.
 * Optionally sets an HTTP error status code.
 *
 * @param mixed $data The error data/message to include in the JSON response.
 * @param int $status_code Optional HTTP status code (e.g., 400, 500). Default is 200.
 */
function json_error( $data = null, $status_code = 400 ) {
	header( 'Content-Type: application/json' );
	http_response_code($status_code);
	echo json_encode( array( 'success' => false, 'errors' => $data ) );
	exit;
}

/**
 * Оновлена функція для обробки форми
 */
function handle_contact_form_callback() {
    global $response, $inputs;

    $is_valid = form_validation();

    if ($is_valid) {
        $formatter = new ContactMessageFormatter($inputs);

        $sender = new NotificationSender();

        $results = $sender->sendAll($formatter, $inputs);

        if (isset($results['telegram']) || isset($results['email'])) {
            $successMessage = [];

            if (isset($results['telegram']) && $results['telegram']) $successMessage[] = 'Telegram';

            if (isset($results['email']) && $results['email']) $successMessage[] = 'Email';

            json_success([
                'status' => 'Message sent successfully via: ' . implode(', ', $successMessage),
                'channels' => $results
            ]);
        } else {
            json_error([
                'mail_error' => 'Failed to send message through any channel. Please try again later.',
                'channels' => $results
            ]);
        }
    } else {
           json_error(['mail_error' => 'Validation failed. Check fields and try again.']);
    }
}

handle_contact_form_callback();