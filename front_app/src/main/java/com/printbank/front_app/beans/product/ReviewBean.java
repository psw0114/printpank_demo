package com.printbank.front_app.beans.product;

import java.util.ArrayList;

import lombok.Data;

@Data
public class ReviewBean {
	private String reviewShow;
	private ArrayList<ReviewDataBean> review;
	
	@Data
	public static class ReviewDataBean {
		private int star;
		private String text;
		private String name;
		private String date;
		private String src;
		private String title;
	}
}
