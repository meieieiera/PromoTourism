import { Injectable } from '@angular/core';
import{Tour} from '../../shared/models/Tour'

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor() { }
  getTourById(id:number): Tour{
    return this.getAll().find(tour=>tour.id == id)!;
  }

  getAll():Tour[]{
    return [
      {
        id:1,
        name: 'Bako National Park with Sea Stack Formation Day Tour in Kuching',
        price: 310,
        stars: 4,
        imageUrl:'/assets/images/tours/bakoPark.png',
        date: '1 OCT 2023',
        pax: 3
      },
      {
        id:2,
        name: 'Kuala Lumpur Suburbs and Batu Caves Tour',
        price: 40,
        stars: 4.5,
        imageUrl:'/assets/images/tours/batucaves.png',
        date: '28 SEPT 2023',
        pax: 2
      },
      {
        id:3,
        name: 'Cameron Highlands Day Tour',
        price: 340,
        stars: 5,
        imageUrl:'/assets/images/tours/cameran.png',
        date: '25 SEPT 2023',
        pax: 4
      },
      {
        id:4,
        name: 'Genting Highlands and Batu Caves Day Tour',
        price: 130,
        stars: 4.5,
        imageUrl:'/assets/images/tours/genting.png',
        date: '20 AUG 2023',
        pax: 2
      },
      {
        id:5,
        name: 'Colmar Bukit Tinggi and Japanese Village Day Tour from Kuala Lumpur',
        price: 196,
        stars: 4,
        imageUrl:'/assets/images/tours/japaneseVillage.png',
        date: '15 AUG 2023',
        pax: 1
      },
      {
        id:6,
        name: 'Mount Kinabalu Climb Via Ferrata Package',
        price: 2720,
        stars: 4,
        imageUrl:'/assets/images/tours/kinabalu.png',
        date: '18 JULY 2023',
        pax: 3
      },
      {
        id:7,
        name: 'Kuala Selangor Full Day Tour from Kuala Lumpur',
        price: 192.80,
        stars: 3.5,
        imageUrl:'/assets/images/tours/kualaSelangor.png',
        date: '5 JUNE 2023',
        pax: 2
      },
      {
        id:8,
        name: 'Langkawi Island Hopping Shared Speedboat Tour',
        price: 40,
        stars: 4.5,
        imageUrl:'/assets/images/tours/langkawi.png',
        date: '28 MAY 2023',
        pax: 1
      },
      {
        id:9,
        name: 'Mari Mari Cultural Village Half Day Tour',
        price: 100,
        stars: 5,
        imageUrl:'/assets/images/tours/mari.png',
        date: '10 MAY 2023',
        pax: 2
      },
      {
        id:10,
        name: 'Historical Melaka Tour with Lunch from Kuala Lumpur',
        price: 145,
        stars: 3,
        imageUrl:'/assets/images/tours/melaka.png',
        date: '14 APRIL 2023',
        pax: 5
      },
      {
        id:11,
        name: 'KL City of Lights Tour with Hop-on Hop-off Bus',
        price: 35,
        stars: 3.5,
        imageUrl:'/assets/images/tours/sunsetKL.png',
        date: '3 APRIL 2023',
        pax: 1
      },
      {
        id:12,
        name: 'Tanjung Rhu Mangrove Tour with Lunch and Transfers in Langkawi',
        price: 100,
        stars: 4.5,
        imageUrl:'/assets/images/tours/tanjungRhu.png',
        date: '21 MAR 2023',
        pax: 2
      },
    ]
  }
}
