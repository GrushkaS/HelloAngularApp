var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Post } from './post';
let AppComponent = class AppComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.post = new Post(); // изменяемый товар
        this.tableMode = true; // табличный режим
    }
    ngOnInit() {
        this.loadPosts(); // загрузка данных при старте компонента
    }
    // получаем данные через сервис
    loadPosts() {
        this.dataService.getPosts()
            .subscribe((data) => this.posts = data);
    }
    // сохранение данных
    save() {
        if (this.post.id == null) {
            this.dataService.createPost(this.post)
                .subscribe((data) => {
                console.log(data);
                this.posts.push(data.body);
            });
        }
        else {
            this.dataService.updatePost(this.post)
                .subscribe(data => this.loadPosts());
        }
        this.cancel();
    }
    editPost(p) {
        this.post = p;
    }
    cancel() {
        this.post = new Post();
        this.tableMode = true;
    }
    delete(p) {
        this.dataService.deletePost(p.id)
            .subscribe(data => this.loadPosts());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app',
        templateUrl: './app.component.html',
        providers: [DataService]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map