package com.printbank.front_app;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printbank.front_app.beans.bucket_list.Bucket_listBean;

@RestController
@RequestMapping(value = {"bucket_list"})
public class Bucket_listController {
	@GetMapping(value = {"content"})
	public Bucket_listBean Cotent(Model model) {
		Bucket_listBean bucket_listBean= new Bucket_listBean();

		ArrayList<Bucket_listBean.item> Bucket_listList = new ArrayList<Bucket_listBean.item>();

		for (int i = 0; i < 6; i++) {
			Bucket_listBean.item items = new Bucket_listBean.item();

			items.setSrc("");
			items.setPdname("가나다라_명함1");
			items.setOptionlist("사각재단 스티커 / 배경없음(원터치) / 강접 아트지 90g 유광코팅 별 사이즈 (60x50mm)");
			
			List<Bucket_listBean.item.Quantity> quantityList = new ArrayList<>();
			Bucket_listBean.item.Quantity quantity = new Bucket_listBean.item.Quantity();
			
			quantity.setQuantity(1000);
			quantity.setParcel(false);
			quantity.setChecked(false);

			quantityList.add(quantity);
			
			items.setQuantity(quantityList);
			items.setItemCase(1);
			items.setPrice(10000);
			items.setMin_count(100);
			items.setMemo("작업메모사항입니다. 오늘 배송나가게 해주세요~!!!!!!! 작업메모사항입니다. 오늘배송...");
			
			Bucket_listList.add(items);
			
		}

		bucket_listBean.setItem(Bucket_listList);

		return bucket_listBean;
	}
}
