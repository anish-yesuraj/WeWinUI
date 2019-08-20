import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { 
    MatFormFieldModule, 
    MatTooltipModule, 
    MatSelectModule,
    MatButtonModule,
    MatIconModule, 
    MatInputModule, 
    MatRippleModule, 
    MatSlideToggleModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule  
} from '@angular/material';


@NgModule({
    imports : [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule, 
        MatTooltipModule, 
        MatSelectModule,
        MatButtonModule, 
        MatIconModule,
        MatInputModule, 
        MatRippleModule, 
        MatSlideToggleModule,
        MatCheckboxModule,
        MatCardModule,
        MatDividerModule,
        MatGridListModule,
        MatTableModule,
        MatDialogModule,
        MatMenuModule,
        MatToolbarModule,
        FlexLayoutModule  
    ],
    exports : [
        FormsModule, 
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatCardModule,
        MatDividerModule,
        MatGridListModule,
        MatTableModule,
        MatDialogModule,
        MatMenuModule,
        MatToolbarModule,
        FlexLayoutModule 
    ],
    declarations : [
        
    ]
})

export class AYCustomModule { }