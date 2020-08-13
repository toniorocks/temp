import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class TestService {

	constructor(private http: HttpClient) { }

	inventorySearch(itemId: string, vendorId: number) {
		const body = {
			itemId,
			vendorId
		}
		return this.http.post(`http://localhost:8031/web/inventory/search`, body);
	}

	getItems() {
		const body = {}
		return this.http.post<any>(`http://localhost:8031/web/catalog`, {});
	}
}
