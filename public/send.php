<?php

$is_local = file_exists(__DIR__ . '/send.config.local.php');

if ($is_local && file_exists(__DIR__ . '/cors.local.php')) {
	include __DIR__ . '/cors.local.php';
}

$inputs = [
	'formTitle' => '',
	'userName' => '',
	'userPhone' => '',
	'userEmail' => '',
	'userServiceCategory' => '',
	'userMessage' => '',
	'refererUrl' => '',
];

function form_validation(): array {
	global $inputs;

	$errors = [];

	$inputs['formTitle'] = $_POST['formTitle'] ?? '';

	if (!empty($_POST['userName'])) {
		$inputs['userName'] = trim($_POST['userName']);
	}

	if (!empty($_POST['userServiceCategory'])) {
		$inputs['userServiceCategory'] = trim($_POST['userServiceCategory']);
	}

	if (!empty($_POST['userPhone'])) {
		$phone = trim($_POST['userPhone']);
		if (ctype_digit(ltrim($phone, '+'))) {
			$inputs['userPhone'] = $phone;
		} else {
			$errors[] = ['userPhone' => 'Invalid phone number format'];
		}
	}

	if (!empty($_POST['userEmail'])) {
		$email = trim($_POST['userEmail']);
		if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$inputs['userEmail'] = $email;
		} else {
			$errors[] = ['userEmail' => 'Invalid email format'];
		}
	}

	if (!empty($_POST['userMessage'])) {
		$inputs['userMessage'] = trim($_POST['userMessage']);
	}

	if (!empty($_SERVER['HTTP_REFERER'])) {
		$inputs['refererUrl'] = $_SERVER['HTTP_REFERER'];
	}

	return $errors;
}

function escapeMarkdownV2(string $text): string {
	$text = strip_tags($text);
	foreach (['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'] as $char) {
		$text = str_replace($char, "\\{$char}", $text);
	}
	return $text;
}

function formatTelegram(array $d): string {
	$e = fn($s) => escapeMarkdownV2($s ?? '');
	$isOffer = $d['formTitle'] === 'offer';

	$msg = $isOffer
		? "💥 *Спеціальна пропозиція*\n\n"
		: "💌 *Нове повідомлення з форми зворотного зв'язку*\n\n";

	$msg .= "*Контактна інформація:*\n";
	$msg .= ">👤 *Ім'я:* {$e($d['userName'])}\n";
	$msg .= ">\n";
	$msg .= ">📱 *Телефон:* \+[{$e($d['userPhone'])}](tel:+{$d['userPhone']})\n";

	if (!empty($d['userServiceCategory'])) {
		$msg .= ">\n";
		$msg .= ">💅 *Послуга:* {$e($d['userServiceCategory'])}\n";
	}

	if (!$isOffer) {
		$msg .= "\n\n*Додатково:*\n";
		$msg .= ">📧 *Email:* {$e($d['userEmail'])}\n";

		if (!empty($d['userMessage'])) {
			$msg .= "\n\n*💬 Повідомлення:*\n>{$e($d['userMessage'])}";
		}

		if (!empty($d['refererUrl'])) {
			$msg .= "\n\n*🔗 Джерело:*\n>{$e($d['refererUrl'])}";
		}
	} elseif (!empty($d['refererUrl'])) {
		$msg .= "\n\n*🔗 Джерело:*\n>{$e($d['refererUrl'])}";
	}

	return $msg;
}

function formatEmail(array $d): string {
	$e = fn($s) => htmlspecialchars($s ?? '', ENT_QUOTES, 'UTF-8');
	$title = $d['formTitle'] === 'offer'
		? '💥 Спеціальна пропозиція'
		: "💌 Нове повідомлення з форми зворотного зв'язку";

	$name = $e($d['userName']);
	$email = $e($d['userEmail']);
	$phone = $e($d['userPhone']);
	$service = $e($d['userServiceCategory']);
	$message = $d['userMessage'] ? nl2br($e($d['userMessage'])) : '';
	$ref = $d['refererUrl'];
	$refEscaped = $e($ref ?: 'Не вказано');
	$refHtml = $ref ? "<a href=\"{$refEscaped}\">{$refEscaped}</a>" : $refEscaped;

	return '<div style="font-family: Arial, sans-serif; max-width: 600px;">'
		. '<h2 style="color: #333;">' . $title . '</h2>'
		. '<table style="width: 100%; border-collapse: collapse;">'
		. '<tr><td style="padding:10px;border:1px solid #ddd;background:#f9f9f9;"><strong>👤:</strong></td><td style="padding:10px;border:1px solid #ddd;">' . $name . '</td></tr>'
		. '<tr><td style="padding:10px;border:1px solid #ddd;background:#f9f9f9;"><strong>📧:</strong></td><td style="padding:10px;border:1px solid #ddd;">' . $email . '</td></tr>'
		. '<tr><td style="padding:10px;border:1px solid #ddd;background:#f9f9f9;"><strong>📱:</strong></td><td style="padding:10px;border:1px solid #ddd;">' . $phone . '</td></tr>'
		. '<tr><td style="padding:10px;border:1px solid #ddd;background:#f9f9f9;"><strong>💅🏻:</strong></td><td style="padding:10px;border:1px solid #ddd;">' . $service . '</td></tr>'
		. '<tr><td style="padding:10px;border:1px solid #ddd;background:#f9f9f9;"><strong>💬:</strong></td><td style="padding:10px;border:1px solid #ddd;">' . $message . '</td></tr>'
		. '<tr><td style="padding:10px;border:1px solid #ddd;background:#f9f9f9;"><strong>🔗:</strong></td><td style="padding:10px;border:1px solid #ddd;">' . $refHtml . '</td></tr>'
		. '</table>'
		. '</div>';
}

class NotificationSender {
	private array $config;

	public function __construct() {
		global $is_local;
		if ($is_local) {
			$this->config = include __DIR__ . '/send.config.local.php';
		} elseif (file_exists(__DIR__ . '/send.config.php')) {
			$this->config = include __DIR__ . '/send.config.php';
		} else {
			$this->config = [];
		}
	}

	public function sendTelegram(string $message): bool {
		$url = "https://api.telegram.org/bot{$this->config['telegram']['bot_token']}/sendMessage";

		$result = @file_get_contents($url, false, stream_context_create([
			'http' => [
				'header' => "Content-type: application/x-www-form-urlencoded\r\n",
				'method' => 'POST',
				'content' => http_build_query([
					'chat_id' => $this->config['telegram']['chat_id'],
					'text' => $message,
					'parse_mode' => 'MarkdownV2',
					'disable_web_page_preview' => true,
				]),
			],
		]));

		if ($result === false) {
			error_log('Telegram API request failed');
			return false;
		}

		$response = json_decode($result, true);

		if (!($response['ok'] ?? false)) {
			error_log('Telegram API error: ' . ($response['description'] ?? 'Unknown'));
			return false;
		}

		return true;
	}

	public function sendEmail(string $body, array $data): bool {
		$to = $this->config['email']['to'];
		$subject = '=?UTF-8?B?' . base64_encode($this->config['email']['subject_prefix'] . ' | Від ' . ($data['userName'] ?? 'Невідомий')) . '?=';

		$headers = "MIME-Version: 1.0\r\nContent-type:text/html;charset=UTF-8\r\n";
		$headers .= "From: B-Fancy <noreply@bfancy.pl>\r\n";

		if (!empty($data['userEmail'])) {
			$headers .= 'Reply-To: ' . $data['userEmail'] . "\r\n";
		}

		return mail($to, $subject, $body, $headers);
	}

	public function sendAll(array $data): array {
		$results['telegram'] = $this->sendTelegram(formatTelegram($data));

		if (!$results['telegram']) {
			$results['email'] = $this->sendEmail(formatEmail($data), $data);
		}

		return $results;
	}
}

function json_response($data = [], int $status = 200): never {
	header('Content-Type: application/json');
	http_response_code($status);
	echo json_encode($data);
	exit;
}

$errors = form_validation();

if ($errors) {
	json_response(['mail_error' => 'Validation failed.', 'fields' => $errors], 400);
}

$sender = new NotificationSender();
$results = $sender->sendAll($inputs);

if ($results['telegram']) {
	json_response(['info' => 'Message sent successfully via Telegram', 'channels' => $results, 'success' => true]);
}

if (($results['email'] ?? false)) {
	json_response(['info' => 'Message sent successfully via Email', 'channels' => $results, 'success' => true]);
}

json_response([
	'mail_error' => 'Failed to send message through any channel. Please try again later.',
	'channels' => $results,
	'success' => false,
], 400);
