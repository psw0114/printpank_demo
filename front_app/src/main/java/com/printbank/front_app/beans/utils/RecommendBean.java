package com.printbank.front_app.beans.utils;

import java.util.ArrayList;

import lombok.Data;

@Data
public class RecommendBean {
	private ArrayList<RecItemsBean> item;
	private boolean isSide;
	
	@Data
	public static class RecItemsBean{
		private String href;
		private String src;
		private String alt;
		private String title;
		private String text;
		private int amount;
		private int price;
	}
}
