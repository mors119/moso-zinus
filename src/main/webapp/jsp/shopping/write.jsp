<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- Q&A 작성 -->
<div id="shopping_write">
	<div class="goods">
		<h4>상품문의 쓰기</h4>
		<div class="goods_info">
			<div class="goods_img">
				<img src="/images/shopping/${item.poster }" alt="이미지">
			</div>
			<div>
				<strong>${item.name }</strong>
				<p>${item.text }</p>
			</div>
		</div>
	</div>
	
	<div class="contain">
		<!-- form 데이터 -->
		<form action="/Shop/writeOk" method="post" enctype="multipart/form-data">
			<input type="hidden" name="itemno" value="${param.itemno}">
			<div class="container">
				<table>
					<tr>
						<th>구분</th>
						<td class="select_wrap1">
							<button class="cateBtn" type="button">상품</button>
							<ul class="option1">
								<li>상품</li>
								<li>배송</li>
								<li>반품/환불</li>
								<li>교환/변경</li>
								<li>기타</li>
							</ul>
							<!-- 상품 선택 시 value 변경 -->
							<input type="hidden" name="cate" id="cateBtn" value="상품">
						</td>
					</tr>
					<tr>
						<th>작성자</th>
						<td class="input_txt"><input type="text" name="writer" value="${not empty member ? member.id : ''}"></td>
					</tr>
					<tr>
						<th>비밀번호</th>
						<td class="input_txt"><input type="password" name="pass"></td>
					</tr>
					<tr>
						<th>제목</th>
						<td class="input_txt"><input type="text" placeholder="제목 입력" name="title"></td>
					</tr>
					<tr>
						<th>내용</th>
						<td class="content">
							<div class="checkbox1_wrap">
								<label class="checkbox1" for="check1">비밀글</label>
								<!-- checkbox 선택 시 값 변경 -->
								<input type="hidden" id="check1" name="secret" value="0">
							</div>
							<p>
								※ 네이버 등 기타 온라인몰에서 구매하신 고객분들께서는 구매처에 문의를 부탁드립니다. <br>
								※ 올려주신 상품후기는 사진과 함께 마케팅 용도로 활용될 수 있습니다. <br>
								※ 상품후기를 올리실 경우 이에 동의하시는 걸로 간주됩니다.
							</p>
							<textarea id="content" name="question" data-editor></textarea>
						</td>
					</tr>
				</table>
			</div>
			<div class="allow">
				<h6>비회원 개인정보 수집동의</h6>
				<p>
					- 수집항목: 성명, 이메일, 휴대전화번호, 전화번호 <br>
					- 수집/이용목적: 문의 접수 및 결과 회신 <br>
					- 이용기간: 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. <br>
					단, 관계법령의 규정에 의하여 보전할 필요가 있는 경우 일정기간 동안 개인정보를 보관할 수 있습니다. <br>
					그 밖의 사항은 지누스 개인정보처리방침을 준수합니다.
				</p>
				<div>
					<!-- Q&A 등록 시 개인정보 동의 -->
					<div class="checkbox1_wrap">
						<label class="checkbox1" for="check2">위 내용에 동의합니다.</label>
						<input type="checkbox" id="check2">
					</div>
					<a href="#">전체보기></a>
				</div>
			</div>
			<!-- 버튼 -->
			<div class="bottom" style="padding-bottom: 20px">
				<!-- 한 단계 뒤로 보내기 -->
				<button onclick="javascript:history.go(-1);">취소</button>
				<button id="req_btn" type="button">등록</button>
			</div>
		</form>
		
	</div>
</div>