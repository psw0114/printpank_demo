package com.printbank.front_app.beans.customer;

import java.util.ArrayList;

import lombok.Data;

@Data
public class QnaBean {
	private ArrayList<QnaBtn> btn;
	private ArrayList<Qnaitem> item;
	
	@Data
	public static class QnaBtn {
		private String text;
		private boolean active;
	}
	
	@Data
	public static class Qnaitem {
		private String type;
		private String title;
		private String orederNum;
		private String date;
		private String proc;
		private String color;
	}
}
