package com.printbank.front_app.beans.customer.db;

import lombok.Data;

@Data
public class NoticeDataBean {
		private String title;
		private String date;
		private String text;
		private String type;
		private boolean active;
}
