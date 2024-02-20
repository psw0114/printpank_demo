package com.printbank.front_app;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.printbank.front_app.beans.utils.HeaderBean;
import com.printbank.front_app.beans.utils.db.HeaderNavBean;
import com.printbank.front_app.services.ServiceTest;

@RestController
@RequestMapping(value = {"header"})
public class HeaderTestController {
	
	@Autowired
	private ServiceTest serviceTest;	
	
	@GetMapping(value = {"item"})
	public HeaderBean header (Model model) {
		HeaderBean headerBean = new HeaderBean();
		List<HeaderBean.itemBean> nav0;
		List<HeaderBean.itemBean> nav1;
		List<HeaderBean.itemBean> product;
		List<HeaderBean.itemBean> img;
		
		serviceTest.getHeaderData(model);
		
		List<HeaderNavBean> header = (List<HeaderNavBean>) model.getAttribute("header");
		
		nav0 = header.stream()
				.filter(h -> {  
					return h.getPrcCode().matches("^\\d+0{2}$");
					
				})
				.map(h -> {
					
					HeaderBean.itemBean item = new HeaderBean.itemBean();					
					item.setPrcCode(h.getPrcCode());
					item.setItem(h.getPrcName());
					
					return item;
				})
				.distinct()
				.collect(Collectors.toList());
		
		
		
		
		nav1 = header.stream()
				.filter(h -> {
					return !h.getPrcCode().matches("^\\d+0{2}$");
				})
				.map(h -> {
					HeaderBean.itemBean item = new HeaderBean.itemBean();

					item.setPrcCode(h.getPrcCode());
					item.setItem(h.getPrcName());
					
					return item;
				})
				.distinct()
				.collect(Collectors.toList());
		
		
		product = header.stream()
				.filter(h -> {
					return h.getPrCode() != null;
				})
				.map(h -> {
					HeaderBean.itemBean item = new HeaderBean.itemBean();

					item.setPrcCode(h.getPrcCode());
					item.setPrCode(h.getPrCode());
					item.setItem(h.getPrName());
					
					return item;
				})
				.distinct()
				.collect(Collectors.toList());
			

		
		img = header.stream()
				.filter(h -> {
					return h.getPiOdCode() != null;
				})
				.map(h -> {
					HeaderBean.itemBean item = new HeaderBean.itemBean();

					item.setPrcCode(h.getPrcCode());
					item.setPrCode(h.getPrCode());
					item.setPiOdCode(h.getPiOdCode());
					item.setSrc(h.getPiImg());
					
					return item;
				})
				.collect(Collectors.toList());
		
				
		
		product.forEach(p -> {
			List<HeaderBean.itemBean> sImg = img.stream()
					.filter(si -> {
						return si.getPrcCode().equals(p.getPrcCode()) && si.getPrCode().equals(p.getPrCode());
					})
					.collect(Collectors.toList());
			
			p.setSubItem(sImg); 
		});
		
		
		
		
		nav1.forEach(n -> {
			List<HeaderBean.itemBean> sPro = product.stream()
					.filter(sp -> {
						return n.getPrcCode().equals(sp.getPrcCode());
					})
					.collect(Collectors.toList());
			
			n.setSubItem(sPro);
		});
		
		
		
		nav0.forEach(n -> {
			List<HeaderBean.itemBean> sNav = nav1.stream()
					.filter(sn -> {
						return sn.getPrcCode().replaceFirst("\\d{2}$", "00").equals(n.getPrcCode());
					})
					.collect(Collectors.toList());
			
			List<HeaderBean.itemBean> sPro = product.stream()
					.filter(sp -> {
						return sp.getPrcCode().replaceFirst("\\d{2}$", "00").equals(n.getPrcCode());
					})
					.collect(Collectors.toList());
			
			if (!sNav.isEmpty()) { 
				n.setSubItem(sNav);
			} else if (!sPro.isEmpty()) { 
				n.setSubItem(sPro);
			}
		});
		
		
		headerBean.setItem(nav0);
			
		return headerBean;
	}	

}
