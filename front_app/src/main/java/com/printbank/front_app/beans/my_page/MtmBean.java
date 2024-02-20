package com.printbank.front_app.beans.my_page;

import java.util.ArrayList;

import lombok.Data;

@Data
public class MtmBean {
	private ArrayList<MtmItemBean> mtm;
	
	@Data
	public static class MtmItemBean{
		private int type;
		private String title;
		private String pnum;
		private String date;
		private int state;
	}
}
