import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';

@Injectable()
export class DataService {

    private url = "/api/posts";

    constructor(private http: HttpClient) {
    }

    getPosts() {
        return this.http.get(this.url);
    }

    getPost(id: number) {
        return this.http.get(this.url + '/' + id);
    }

    createPost(post: Post) {
        return this.http.post(this.url, post);
    }
    updatePost(post: Post) {

        return this.http.put(this.url, post);
    }
    deletePost(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}