import { Component, OnInit,EventEmitter,CUSTOM_ELEMENTS_SCHEMA, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { debounceTime, filter } from 'rxjs';
import { Book } from 'src/app/core/models/book-response.model';
import { SubjectsService } from 'src/app/core/services/subjects.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myString='';
  bookSearch: FormControl;
  isLoading=true;
  bookName='';
  allBooks: Book[] = [];
 
  


 
  constructor(private route: ActivatedRoute,private subjectsService: SubjectsService){this.bookSearch = new FormControl('');}
 

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];
  getAlldata() {
    this.searchTextChanged.emit(this.myString);
    this.subjectsService.getAlldata(this.myString).subscribe((data) => {
      this.allBooks = data?.works;
      console.log(this.allBooks)
      // localStorage.setItem("book",this.subjectName);
      // this.subjectsArray = data;
      this.isLoading = false;
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.bookName = params.get('name') || '';
      this.isLoading = true;
      this.getAlldata();
    });
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      subscribe((value: string) => {
      });
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  
 

 
}
