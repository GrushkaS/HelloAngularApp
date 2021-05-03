import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Post } from './post';

@Component({
    templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {

    posts: Post[];
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.load();
    }
    load() {
        this.dataService.getPosts().subscribe((data: Post[]) => this.posts = data);
    }
    delete(id: number) {
        this.dataService.deletePost(id).subscribe(data => this.load());
    }
}