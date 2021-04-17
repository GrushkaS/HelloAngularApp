import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Post } from './post';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [DataService]
})
export class AppComponent implements OnInit {

    post: Post = new Post();   // изменяемый товар
    posts: Post[];                // массив товаров
    tableMode: boolean = true;          // табличный режим

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadPosts();    // загрузка данных при старте компонента
    }
    // получаем данные через сервис
    loadPosts() {
        this.dataService.getPosts()
            .subscribe((data: Post[]) => this.posts = data);
    }
    // сохранение данных
    save() {
        if (this.post.id == null) {
            this.dataService.createPost(this.post)
                .subscribe((data: Post) => this.posts.push(data));
        } else {
            this.dataService.updatePost(this.post)
                .subscribe(data => this.loadPosts());
        }
        this.cancel();
    }
    editPost(p: Post) {
        this.post = p;
    }
    cancel() {
        this.post = new Post();
        this.tableMode = true;
    }
    delete(p: Post) {
        this.dataService.deletePost(p.id)
            .subscribe(data => this.loadPosts());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
}