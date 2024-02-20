package com.printbank.front_app.beans.payment;

import java.util.ArrayList;

import lombok.Data;

@Data
public class PaymentBean {
	private ArrayList<ItemListBean> payment;
	
	@Data
	public static class ItemListBean{
		private String src;
		private String pname;
		private String optionlist;
		private String parcel;
		private int price; 
	}
}
