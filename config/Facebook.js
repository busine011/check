
const axios = require('axios');
class FacebookService {
	constructor(groups) {
		this.groups = groups;
	}

  
	async getGroupsWithoutRevision() {
		const groups = [];
		const revisar_datos = await this.revisar_id_grupo();
		revisar_datos.forEach(group => {
			if(group.info === 'No tiene revision') {
				groups.push(group.id);
			}
		});
		return [...new Set(groups)];
	}


  
	async revisar_id_grupo() {
		const groupsInfo = [];

		for(let groupId of this.groups) {
			groupId = Number(groupId);
			if(!groupId) continue;

			let info = 'No tiene revision';
      
			try {
				var options = {
					method: 'POST',
					url: 'https://www.facebook.com/ajax/groups/unified_queue/count_badge/',
					params: {
						admin_queue_type: 'pending',
						group_id: `${groupId}`,
						count_badge_dom_id: 'count_badge_pending'
					},
					headers: {
						host: 'www.facebook.com',
						connection: 'keep-alive',
						'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
						'sec-ch-ua-platform': '"Windows"',
						'sec-ch-ua-mobile': '?0',
						'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
						'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryfk8LQliDxa4R3d06',
						accept: '*/*',
						origin: 'https://www.facebook.com',
						'sec-fetch-site': 'none',
						'sec-fetch-mode': 'cors',
						'sec-fetch-dest': 'empty',
						'accept-encoding': 'gzip, deflate, br',
						'accept-language': 'es-ES,es;q=0.9',
						cookie: 'datr=ZrcwZJx-RbG6Eq5RC1kBwNP1; sb=2bcwZEI3BWBBYa7JBOYQz2w9; oo=v1; m_pixel_ratio=1; wd=1422x1329; xs=2:Ihm3gb4-OYcpPA:2:1679141275:-1:11550; c_user=100022609179761; fr=0O7p5e77rwvtkeTwy.AWUXJj9w9IkJzl6cAYrKYgYWnIM.BkMLdm.0d.AAA.0.0.BkMQxX.AWU_dDhfN20; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1680936028096%2C%22v%22%3A1%7D; m_page_voice=100022609179761',
						referer: 'https://www.facebook.com'
					},
					data: '------WebKitFormBoundaryfk8LQliDxa4R3d06\r\nContent-Disposition: form-data; name="__user"\r\n\r\n100022609179761\r\n------WebKitFormBoundaryfk8LQliDxa4R3d06\r\nContent-Disposition: form-data; name="fb_dtsg"\r\n\r\nNAcNm4YhzhEIuVtVZWVAEox-lQvAkSLGBfrSKraVbT0QkpcPGi8CwPQ:2:1679141275\r\n------WebKitFormBoundaryfk8LQliDxa4R3d06\r\nContent-Disposition: form-data; name="__a"\r\n\r\n1\r\n------WebKitFormBoundaryfk8LQliDxa4R3d06\r\nContent-Disposition: form-data; name="__csr"\r\n\r\n\r\n------WebKitFormBoundaryfk8LQliDxa4R3d06\r\nContent-Disposition: form-data; name="__req"\r\n\r\n3\r\n------WebKitFormBoundaryfk8LQliDxa4R3d06\r\nContent-Disposition: form-data; name="__beoa"\r\n\r\n0\r\n------WebKitFormBoundaryfk8LQliDxa4R3d06\r\nContent-Disposition: form-data; name="__pc"\r\n\r\nPHASED%3ADEFAULT\r\n------WebKitFormBoundaryfk8LQliDxa4R3d06\r\nContent-Disposition: form-data; name="dpr"\r\n\r\n1\r\n------WebKitFormBoundaryfk8LQliDxa4R3d06\r\nContent-Disposition: form-data; name="__ccg"\r\n\r\nGOOD\r\n------WebKitFormBoundaryfk8LQliDxa4R3d06--\r\n'
				};
				const respuesta = await axios.request(options).then(function(response) {
					//console.log(response.data);
					return response.data;
				}).catch(function(error) {
					//console.error(error);
				});
				if(respuesta.includes('Se ha producido un problema con esta solicitud')) {
					info = 'Error o no existe';
				}
				if(respuesta.includes('__html')) {
					info = 'Revision';
				}
				if(respuesta.includes('El contenido solicitado no puede mostrarse en este momento')) {
					info = 'No existe';
				}
			} catch(e) {
				console.log("ERROR AL GESTIONAR=====>" + e);
			}
			groupsInfo.push({
				id: groupId,
				info
			});
		}
    console.log(groupsInfo);
		return groupsInfo;
	}


  
}


module.exports = FacebookService;
