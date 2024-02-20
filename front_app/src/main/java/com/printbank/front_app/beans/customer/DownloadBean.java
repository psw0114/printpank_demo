package com.printbank.front_app.beans.customer;

import java.util.ArrayList;

import lombok.Data;

@Data
public class DownloadBean {
	private ArrayList<DownloadBtn> btn;
	private ArrayList<Downloaditem> item;
	
	@Data
	public static class DownloadBtn {
		private String text;
		private boolean active;
	}
	
	@Data
	public static class Downloaditem {
		private int num;
		private String divide;
		private String size;
		private String file_name;
	}
}
