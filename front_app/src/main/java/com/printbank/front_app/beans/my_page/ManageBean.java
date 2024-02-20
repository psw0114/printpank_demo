package com.printbank.front_app.beans.my_page;

import java.util.ArrayList;

import lombok.Data;

@Data
public class ManageBean {
	private ArrayList<ManagerBean> managerlist;
	
	@Data
	public static class ManagerBean {
		private String manager;
		private String phone;
		private String call;
	}
}
