package com.lumora.backend.services;

import com.lumora.backend.models.Booking;
import com.lumora.backend.models.CustomMenu;
import com.lumora.backend.models.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private MessageService messageService;

    public void sendStatusUpdateEmail(Booking booking) {
        sendStatusUpdateEmail(booking, "en");
    }

    public void sendStatusUpdateEmail(Booking booking, String language) {
        String to = booking.getUser().getEmail();
        String subject = messageService.getMessage("booking.update.subject", language);
        String body = messageService.getMessage("booking.update.body", language, Map.of(
            "username", booking.getUser().getUsername(),
            "roomType", booking.getRoom().getRoomType().getName(),
            "checkIn", booking.getCheckInDate().toString(),
            "checkOut", booking.getCheckOutDate().toString(),
            "status", booking.getStatus()
        ));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        
        mailSender.send(message);
    }

    public void sendSignInUpdateEmail(User user, String language) {
        String to = user.getEmail();
        String subject = messageService.getMessage("welcome.subject", language);
        String body = messageService.getMessage("welcome.body", language, Map.of("username", user.getUsername()));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public void sendSavedCustomMenuEmail(CustomMenu menu, String language) {
        String to = menu.getUser().getEmail();
        String subject = messageService.getMessage("menu.saved.subject", language);
        String body = messageService.getMessage("menu.saved.body", language, Map.of("username", menu.getUser().getUsername()));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
