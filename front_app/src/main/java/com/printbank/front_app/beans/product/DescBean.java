package com.printbank.front_app.beans.product;

import java.util.ArrayList;

import lombok.Data;

@Data
public class DescBean {
	private ArrayList<ItemBean> desc;
	
	@Data
	public static class ItemBean {
		private String src;
		private String alt;
	}
}
