package com.printbank.front_app;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printbank.front_app.beans.category.CategoryBean;
import com.printbank.front_app.beans.category.db.CategoryDataBean;
import com.printbank.front_app.services.CshService;

@RestController
@RequestMapping(value = {"category"})
public class CategoryController {
	
	@Autowired
	private CshService cServ;
	
	@GetMapping(value = {"product"})
	public CategoryBean product(Model model) {
		cServ.Category(model);
		CategoryBean category = new CategoryBean();
		category.setItem((List<CategoryDataBean>) model.getAttribute("Data"));
		
		for(int i = 0; i<category.getItem().size(); i++) {
			category.getItem().get(i).setAlt("product_img_"+i);
			category.getItem().get(i).setAmount(0);
			category.getItem().get(i).setPrice(0);
		}
		model.addAttribute("Category", category);
		return (CategoryBean)model.getAttribute("Category");
	}
}
