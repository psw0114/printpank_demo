package com.printbank.front_app.beans.my_page;

import java.util.ArrayList;

import lombok.Data;

@Data
public class DeliveryBean {
	private ArrayList<SummaryBean> summary;
	private ArrayList<ItemBean> items;
	
	@Data
	public static class SummaryBean {
		private int count;
		private String text;
	}
	
	@Data
	public static class ItemBean {
		private String src; 
		private String date;
		private String pname;
		private String poption;
		private String alt;
		private int price;
		private int state;
	}
}
