package com.printbank.front_app.beans.bucket_list;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Bucket_listBean {
	private ArrayList<item> item;
	
	@Data
	public static class item {
		private String src;
		private String pdname;
		private String optionlist;
		private List<Quantity> quantity;
		private int price;
		private int itemCase;
		private int min_count;
		private String memo;
		
		@Data
		public static class Quantity {
			private int quantity;
			private boolean parcel;
			private boolean checked;
		}
	}
}
