package com.printbank.front_app.beans.customer.db;

import lombok.Data;

@Data
public class FaQDataBean {
	private String type;
	private String question;
	private String answer;
	private boolean active;
}
