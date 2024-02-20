package com.printbank.front_app.beans.category;

import java.util.List;

import com.printbank.front_app.beans.category.db.CategoryDataBean;

import lombok.Data;

@Data
public class CategoryBean {
	private List<CategoryDataBean> item;
}
