package com.printbank.front_app.beans.category.db;

import lombok.Data;

@Data
public class CategoryDataBean {
	private String prCode;
	private String prName;
	private String prDesc;
	private String src;
	private String alt;
	private int price;
	private int amount;
}