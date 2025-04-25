package com.email.NeoMail.app;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;

//    public CharSequence getTone() {
//        return null;
//    }
//
//    public char[] getEmailContent() {
//        return new char[0];
//    }
}
