package com.printbank.front_app.beans.main.db;

import lombok.Data;

@Data
public class ReviewBean {
	private String prCode;
	private String prName;
	private String prDesc;
	private int amount;
	private int price;
	private String userName;
	private String reviewText;
	private int star;
	private String src;
	private String alt;
	private String reviewSrc;
	private String reviewAlt;
}