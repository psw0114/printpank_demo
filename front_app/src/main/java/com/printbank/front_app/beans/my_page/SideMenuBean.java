package com.printbank.front_app.beans.my_page;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class SideMenuBean {
	private ArrayList<MenuListBean> sidemenu;
	
	@Data
	public static class MenuListBean{
		private String type;
		private String title;
		private String el;
		private SubTypeBean subtype; 
	}
	
	@Data
	public static class SubTypeBean{
		private String type;
		private String title;
		private String el;		
	}
}
