package com.printbank.front_app.beans.my_page;

import java.util.ArrayList;

import lombok.Data;

@Data
public class ParcelBean {
	private ArrayList<ParcelListBean> parcel;
	
	@Data
	public static class ParcelListBean{
		private String name;
		private String address;
		private String phone;
		private String call;
	}
}
