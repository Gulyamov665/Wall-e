from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string

def send_verification_code(email, code):
    subject = 'Ваш проверочный код'
    message = render_to_string('email.html', {'code': code})
    sender_email = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, sender_email, recipient_list, html_message=message)