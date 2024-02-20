package com.printbank.front_app.beans.customer;

import java.util.ArrayList;

import lombok.Data;

@Data
public class NoticeBean {
	private ArrayList<Noticebtn> btn;
	private ArrayList<Noticeitem> item;
	
	@Data
	public static class Noticebtn {
		private String text;
		private boolean active;
	}
	
	@Data
	public static class Noticeitem {
		private String title;
		private String date;
		private String text;
		private boolean isMain;
		private boolean active;
	}
}
