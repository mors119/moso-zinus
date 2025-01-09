window.addEventListener('DOMContentLoaded', function() {
	// 로그인 버튼 (헤더 영역 아이콘)
	clickEvent('#loginbtn', () => loginMainBtn.click());
	
	// 개인정보 수정 버튼 (헤더 영역 아이콘)
	clickEvent('#updateBtn', () => location.href = '/Member/update');
	
	// 로그인 버튼(회원가입 완료 페이지)
	clickEvent('#loginbtnJoin', () => loginMainBtn.click());
	
	// 닫기 버튼 (공통)
	const closeBtns = document.querySelectorAll('.login_wrap .login_close');
	if (closeBtns) {
		closeBtns.forEach((b) => {
			b.addEventListener('click', function(e) {
				e.preventDefault();
				closeFn(this);
				// 스크롤바 활성화
				document.body.classList.remove('on');
			});
		});
	}
	
	// 로그인 메인 (화면 활성화)
	const loginMainBtn = document.querySelector('.btn_login_main');
	if (loginMainBtn) {
		loginMainBtn.addEventListener('click', function(e) {
			e.preventDefault();
			closeFn(this);
			
			// 아이디 / 패스워드 초기화
			resetLoginFields();
			
			// 로그인 영역 활성화
			document.querySelector('.login_main').classList.add('on');
			
			// 스크롤바 비활성화
			document.body.classList.add('on');
			
			// 포커스
			document.querySelector('.login_info input[name=id]').focus();
		});
	}
	
	// 찾은 아이디 페이지 에서 로그인하기 버튼
	clickEvent('.btn_login_main2', function () {
	    closeFn(this);
	    loginMainBtn.click();
	});
	
	// 찾은 비밀번호 페이지 에서 로그인하기 버튼
	clickEvent('.btn_login_main3', function () {
	    closeFn(this);
	    loginMainBtn.click();
	});

	// 아이디 찾기 버튼 (화면 활성화)
	const findIdBtns = document.querySelectorAll('.login_wrap .btn_find_id');
	if (findIdBtns) {
		findIdBtns.forEach((b) => {
			b.addEventListener('click', function(e) {
				e.preventDefault();
				closeFn(this);
				
				// 이름 / 이메일 초기화
				resetLoginFields();
				
				// 아이디 찾기 영역 활성화
				document.querySelector('.login_find_id').classList.add('on');
				
				// 포커스
				document.querySelector('.login_find_id input[name=name]').focus();
			});
		});
	}

	// 비밀번호 찾기 버튼 (화면 활성화)
	const findPwBtns = document.querySelectorAll('.login_wrap .btn_find_pw');
	if (findPwBtns) {
		findPwBtns.forEach((b) => {
			b.addEventListener('click', function(e) {
				e.preventDefault();
				closeFn(this);
				
				// 아이디 초기화
				document.querySelector('.login_find_pw_info > input[type=text]').value = '';
				
				// 비밀번호 찾기 영역 활성화
				document.querySelector('.login_find_pw').classList.add('on');
				
				// 포커스
				document.querySelector('.login_find_pw_info > input[type=text]').focus();
			});
		});
	}
	
	// 비밀번호 찾기 (실행)
	const loginFindedId = document.querySelector('.login_find_pw_info input[name=id]');
	const loginFindedBtn = document.querySelector('#loginFindedBtn');
	
	if (loginFindedBtn) {
		loginFindedBtn.addEventListener('click', function() {
			if (loginFindedId.value.trim()) {
				const params = { id : loginFindedId.value };
				
				post('/Member/pwFined', params, (data) => {
					if (data) {
						const loginFindedOkEl = document.querySelector('.login_find_pw_ok');
						loginFindedOkEl.children[0].innerHTML = data;
						
						// 현재 페이지 닫기
						closeFn(this);
						
						// 비밀번호 찾은페이지 영역 활성화
						loginFindedOkEl.classList.add('on');
						
					} else {
						alert('등록된 아이디가 없습니다.', () => {
							loginFindedId.value = '';
							loginFindedId.focus();
						});
					}
				});
				
			} else {
				alert('아이디를 입력해주세요', () => loginFindedId.focus());
			}
		});
		
		loginFindedId.addEventListener('keyup', function(e) {
			if (e.key === 'Enter') loginFindedBtn.click();
		});
	}
	
	// 임시 비밀번호 복사
	clickEvent('.login_find_pw_ok .btn_finded_copy', () => {
		const _pass = document.querySelector('.login_find_pw_ok > .finded_pw > strong').innerText;
		window.navigator.clipboard.writeText(_pass).then(() => {alert('찾은 비밀번호를 복사하였습니다.')});
	});

	// 로그인하기 (실제 로그인 진행)
	clickEvent('#memberLoginBtn', () => {
		const idEl = document.querySelector('.login_main input[name=id]');
		const pwEl = document.querySelector('.login_main input[name=pass]');
		const id = idEl.value.trim();
		const pw = pwEl.value.trim();

		if (id.length <= 0) {
			alert('아이디를 입력해주세요', () => idEl.focus());
		} else if (pw.length <= 0) {
			alert('패스워드를 입력해주세요', () => pwEl.focus());
		} else {
			post('/Member/login', { id, pw }, (data) => {
				if (data === -1) {
					alert('회원정보를 찾을 수 없습니다.', () => idEl.focus());
				} else {
					if (location.pathname === '/Member/joinOk') location.href = "/Main";
					else location.reload();
				}
			});
		}
	});
	
	// 비밀번호에서 엔터키 이벤트 (로그인)
	const passBtnEl = document.querySelector('.login_info input[name=pass]');
	if (passBtnEl) {
		passBtnEl.addEventListener('keyup', function(e) {
			if (e.key === 'Enter') document.querySelector('#memberLoginBtn').click()
		});
	}

	// 아이디 찾기 (실행)
	clickEvent('#findedIdBtn', () => {
		const nameEl = document.querySelector('.login_find_id input[name=name]');
		const emailEl = document.querySelector('.login_find_id input[name=email]');
		const name = nameEl.value.trim();
		const email = emailEl.value.trim();
		
		if (name.length <= 0) {
			alert('이름을 입력해주세요', () => nameEl.focus());
		} else if (email.length <= 0) {
			alert('이메일을 입력해주세요', () => emailEl.focus());
		} else {
			post('/Member/idFined', { name, email }, (data) => {
				if (data) {
					const loginFindOk = document.querySelector('.login_find_id_ok');
					loginFindOk.children[0].innerHTML = data;
					loginFindOk.classList.add('on');
				} else {
					alert('회원정보를 찾을 수 없습니다.')
				}
			});
		}
	});
	
	// 이메일에서 엔터 이벤트 (아이디 찾기)
	const findedIdEnter = document.querySelector('.login_find_id input[name=email]');
	if (findedIdEnter) {
		findedIdEnter.addEventListener('keyup', function(e) {
			if (e.key === 'Enter') document.querySelector('#findedIdBtn').click()
		});
	}
	
	// 회원가입 (약관) 다음단계
	clickEvent('#btnNextStep', () => {
		const termsAgree1 = document.querySelector('#termsAgree1').checked;
		const termsAgree2 = document.querySelector('#termsAgree2').checked;

		if (termsAgree1 && termsAgree2) {
			location.href = '/Member/join';
		} else {
			document.querySelector('.join_msg').classList.add('on');
			alert('(필수)이용약관을 체크해주세요.');
		}
	});

	// 회원가입 약관동의 전체 선택
	const allAgree = document.querySelector('#allAgree');
	const agreeCheckboxs = document.querySelectorAll('.join_terms_view input[type=checkbox]');
	if (allAgree) {
		allAgree.addEventListener('click', function() {
			agreeCheckboxs.forEach(checkbox => {
	            checkbox.checked = this.checked;
	        });
		});
	}
	
	// 회원가입 약관 체크박스 선택 별 (전체 선택 / 취소)
	if (agreeCheckboxs) {
		agreeCheckboxs.forEach(b => {
			b.addEventListener('click', function() {
				allAgree.checked = Array.from(agreeCheckboxs).every(checkbox => checkbox.checked);
			});
		});
	}
	
	// 회원가입 아이디 중복체크
	const user_idEl = document.querySelector('#id');
	if (user_idEl) {
		user_idEl.addEventListener('blur', function() {
			const id = user_idEl.value.trim();
			
			if (id.length > 0) {
				post('/Member/idCheck', { id }, (data) => {
					let msg = '사용가능한 아이디입니다.';
				
					if (data !== 'ok') {
						msg = '이미 등록된 아이디입니다. 다른 아이디를 입력해 주세요.';
						this.focus();
					}
					
					this.nextElementSibling.innerHTML = msg;
					this.nextElementSibling.classList.add('ok');
				});
				
			} else {
				this.nextElementSibling.classList.remove('ok');
			}
		});
	}
	
	// 회원가입 아이디 유효성 체크
//	if (user_idEl) {
//			user_idEl.addEventListener('blur', function() {
//				const id = user_idEl.value.trim();
//				
//				if (id.length) {
//					post('/Member/idCheck', { id }, (data) => {
//						let msg = '사용가능한 아이디입니다.';
//					
//						if (data !== 'ok') {
//							msg = '아이디는 12글자 이하로 만들어주세요.';
//							this.focus();
//						}
//						
//						this.nextElementSibling.innerHTML = msg;
//						this.nextElementSibling.classList.add('ok');
//					});
//					
//				} else {
//					this.nextElementSibling.classList.remove('ok');
//				}
//			});
//		}
		
		
	// 회원정보 수정
	

	
	// 비밀번호 확인
//	const user_pass1El = document.querySelector('#pass');
//	const user_pass2El = document.querySelector('#pass2');
//	if (user_pass1El) {
//		user_pass2El.addEventListener('blur', function() {
//			const _pass1 = user_pass1El.value.trim();
//			const _pass2 = user_pass2El.value.trim();
//			
//			if (_pass1 !== _pass2) {
//				alert('비밀번호가 다릅니다.', () => {
//					user_pass2El.focus();
//				});
//			}
//		});
//	}
	
	// 비밀번호 보기 (눈 아이콘 클릭)
	const passViewIcons = document.querySelectorAll('.join_wrap .password_icon');
	if (passViewIcons) {
		passViewIcons.forEach(btn => {
			btn.addEventListener('click', function() {
				if (this.previousElementSibling.type === 'text') {
					this.previousElementSibling.type = 'password';
					this.style.background = 'url(/images/common/eye2.svg) no-repeat center / cover';
				} else {
					this.style.background = 'url(/images/common/eye1.svg) no-repeat center / cover';
					this.previousElementSibling.type = 'text';
				}
			});
		});
	}
	
	// 이메일 선택
	const domainEl = document.querySelector('select[name=domain]');
	if (domainEl) {
		domainEl.addEventListener('change', function() {
			let domainVal = this.value;
			let emailEl = document.querySelector('input[name=email]');
			if (isContains(emailEl, '@')) {
				emailEl.value = emailEl.value.substring(0, emailEl.value.indexOf('@'));
			}
			emailEl.value += '@' + domainVal;
			if (!domainVal) emailEl.focus();
		});
	}
	
	clickEvent('.join_btns .withdraw_btn', () => {
		confirm('정말 탈퇴하시겠습니까?', () => {
			location.href = '/Member/withdraw';
		});
	});
	
}); // DOMContentLoaded

// 닫기 공통
function closeFn(btn) {
	const parentEl = btn.closest('.on');
	if (parentEl) parentEl.classList.remove('on');
}

// 로그인 필드 초기화 함수
function resetLoginFields() {
    document.querySelector('.login_info input[name=id]').value = '';
    document.querySelector('.login_info input[name=pass]').value = '';
}

// postcode API
function postcode() {
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var roadAddr = data.roadAddress; // 도로명 주소 변수
			var extraRoadAddr = ''; // 참고 항목 변수

			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
			if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
				extraRoadAddr += data.bname;
			}
			// 건물명이 있고, 공동주택일 경우 추가한다.
			if (data.buildingName !== '' && data.apartment === 'Y') {
				extraRoadAddr += extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
			}
			// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
			if (extraRoadAddr !== '') {
				extraRoadAddr = ' (' + extraRoadAddr + ')';
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('zipcode').value = data.zonecode;
			document.getElementById('address1').value = roadAddr;
		},
	}).open();
}
