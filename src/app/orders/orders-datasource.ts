import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Injectable } from '@angular/core';

export interface OrdersItem {
  id: number;
  customerName: string;
  orderDate: string;
  total: number;
  status: string;
  items: number;
}

const EXAMPLE_DATA: OrdersItem[] = [
  {
    id: 1,
    customerName: 'John Smith',
    orderDate: '2024-01-15',
    total: 125.5,
    status: 'Delivered',
    items: 3,
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    orderDate: '2024-01-16',
    total: 89.99,
    status: 'Processing',
    items: 2,
  },
  {
    id: 3,
    customerName: 'Mike Davis',
    orderDate: '2024-01-17',
    total: 234.75,
    status: 'Shipped',
    items: 5,
  },
  {
    id: 4,
    customerName: 'Emily Wilson',
    orderDate: '2024-01-18',
    total: 67.25,
    status: 'Delivered',
    items: 1,
  },
  {
    id: 5,
    customerName: 'David Brown',
    orderDate: '2024-01-19',
    total: 156.8,
    status: 'Processing',
    items: 4,
  },
  {
    id: 6,
    customerName: 'Lisa Anderson',
    orderDate: '2024-01-20',
    total: 298.45,
    status: 'Shipped',
    items: 6,
  },
  {
    id: 7,
    customerName: 'Tom Martinez',
    orderDate: '2024-01-21',
    total: 78.9,
    status: 'Delivered',
    items: 2,
  },
  {
    id: 8,
    customerName: 'Jennifer Lee',
    orderDate: '2024-01-22',
    total: 445.6,
    status: 'Processing',
    items: 8,
  },
  {
    id: 9,
    customerName: 'Robert Taylor',
    orderDate: '2024-01-23',
    total: 112.3,
    status: 'Shipped',
    items: 3,
  },
  {
    id: 10,
    customerName: 'Amanda Garcia',
    orderDate: '2024-01-24',
    total: 89.75,
    status: 'Delivered',
    items: 2,
  },
  {
    id: 11,
    customerName: 'Chris Rodriguez',
    orderDate: '2024-01-25',
    total: 178.9,
    status: 'Processing',
    items: 4,
  },
  {
    id: 12,
    customerName: 'Michelle White',
    orderDate: '2024-01-26',
    total: 267.45,
    status: 'Shipped',
    items: 5,
  },
  {
    id: 13,
    customerName: 'Kevin Thompson',
    orderDate: '2024-01-27',
    total: 95.2,
    status: 'Delivered',
    items: 2,
  },
  {
    id: 14,
    customerName: 'Rachel Moore',
    orderDate: '2024-01-28',
    total: 334.8,
    status: 'Processing',
    items: 7,
  },
  {
    id: 15,
    customerName: 'Daniel Clark',
    orderDate: '2024-01-29',
    total: 145.6,
    status: 'Shipped',
    items: 3,
  },
  {
    id: 16,
    customerName: 'Jessica Hall',
    orderDate: '2024-01-30',
    total: 189.75,
    status: 'Delivered',
    items: 4,
  },
  {
    id: 17,
    customerName: 'Matthew Lewis',
    orderDate: '2024-02-01',
    total: 276.9,
    status: 'Processing',
    items: 6,
  },
  {
    id: 18,
    customerName: 'Ashley Walker',
    orderDate: '2024-02-02',
    total: 134.5,
    status: 'Shipped',
    items: 3,
  },
  {
    id: 19,
    customerName: 'James Allen',
    orderDate: '2024-02-03',
    total: 89.25,
    status: 'Delivered',
    items: 2,
  },
  {
    id: 20,
    customerName: 'Nicole Young',
    orderDate: '2024-02-04',
    total: 445.8,
    status: 'Processing',
    items: 9,
  },
  {
    id: 21,
    customerName: 'Ryan King',
    orderDate: '2024-02-05',
    total: 167.3,
    status: 'Shipped',
    items: 4,
  },
  {
    id: 22,
    customerName: 'Stephanie Wright',
    orderDate: '2024-02-06',
    total: 298.75,
    status: 'Delivered',
    items: 5,
  },
  {
    id: 23,
    customerName: 'Andrew Lopez',
    orderDate: '2024-02-07',
    total: 78.45,
    status: 'Processing',
    items: 2,
  },
  {
    id: 24,
    customerName: 'Lauren Hill',
    orderDate: '2024-02-08',
    total: 356.9,
    status: 'Shipped',
    items: 7,
  },
  {
    id: 25,
    customerName: 'Brandon Scott',
    orderDate: '2024-02-09',
    total: 123.6,
    status: 'Delivered',
    items: 3,
  },
  {
    id: 26,
    customerName: 'Megan Green',
    orderDate: '2024-02-10',
    total: 234.25,
    status: 'Processing',
    items: 5,
  },
  {
    id: 27,
    customerName: 'Tyler Adams',
    orderDate: '2024-02-11',
    total: 189.8,
    status: 'Shipped',
    items: 4,
  },
  {
    id: 28,
    customerName: 'Rebecca Baker',
    orderDate: '2024-02-12',
    total: 67.9,
    status: 'Delivered',
    items: 1,
  },
  {
    id: 29,
    customerName: 'Justin Gonzalez',
    orderDate: '2024-02-13',
    total: 445.3,
    status: 'Processing',
    items: 8,
  },
  {
    id: 30,
    customerName: 'Hannah Nelson',
    orderDate: '2024-02-14',
    total: 156.75,
    status: 'Shipped',
    items: 3,
  },
  {
    id: 31,
    customerName: 'Nathan Carter',
    orderDate: '2024-02-15',
    total: 298.4,
    status: 'Delivered',
    items: 6,
  },
  {
    id: 32,
    customerName: 'Samantha Mitchell',
    orderDate: '2024-02-16',
    total: 89.6,
    status: 'Processing',
    items: 2,
  },
  {
    id: 33,
    customerName: 'Joshua Perez',
    orderDate: '2024-02-17',
    total: 334.85,
    status: 'Shipped',
    items: 7,
  },
  {
    id: 34,
    customerName: 'Amber Roberts',
    orderDate: '2024-02-18',
    total: 178.2,
    status: 'Delivered',
    items: 4,
  },
  {
    id: 35,
    customerName: 'Eric Turner',
    orderDate: '2024-02-19',
    total: 267.9,
    status: 'Processing',
    items: 5,
  },
  {
    id: 36,
    customerName: 'Brittany Phillips',
    orderDate: '2024-02-20',
    total: 145.75,
    status: 'Shipped',
    items: 3,
  },
  {
    id: 37,
    customerName: 'Steven Campbell',
    orderDate: '2024-02-21',
    total: 89.45,
    status: 'Delivered',
    items: 2,
  },
  {
    id: 38,
    customerName: 'Melissa Parker',
    orderDate: '2024-02-22',
    total: 445.15,
    status: 'Processing',
    items: 9,
  },
  {
    id: 39,
    customerName: 'Timothy Evans',
    orderDate: '2024-02-23',
    total: 234.6,
    status: 'Shipped',
    items: 5,
  },
  {
    id: 40,
    customerName: 'Christina Edwards',
    orderDate: '2024-02-24',
    total: 167.85,
    status: 'Delivered',
    items: 4,
  },
  {
    id: 41,
    customerName: 'Derek Collins',
    orderDate: '2024-02-25',
    total: 298.3,
    status: 'Processing',
    items: 6,
  },
  {
    id: 42,
    customerName: 'Vanessa Stewart',
    orderDate: '2024-02-26',
    total: 78.95,
    status: 'Shipped',
    items: 2,
  },
  {
    id: 43,
    customerName: 'Corey Morris',
    orderDate: '2024-02-27',
    total: 356.45,
    status: 'Delivered',
    items: 7,
  },
  {
    id: 44,
    customerName: 'Tiffany Rogers',
    orderDate: '2024-02-28',
    total: 123.8,
    status: 'Processing',
    items: 3,
  },
  {
    id: 45,
    customerName: 'Adam Reed',
    orderDate: '2024-02-29',
    total: 234.15,
    status: 'Shipped',
    items: 5,
  },
  {
    id: 46,
    customerName: 'Heather Cook',
    orderDate: '2024-03-01',
    total: 189.6,
    status: 'Delivered',
    items: 4,
  },
  {
    id: 47,
    customerName: 'Patrick Morgan',
    orderDate: '2024-03-02',
    total: 67.75,
    status: 'Processing',
    items: 1,
  },
  {
    id: 48,
    customerName: 'Monica Bell',
    orderDate: '2024-03-03',
    total: 445.9,
    status: 'Shipped',
    items: 8,
  },
  {
    id: 49,
    customerName: 'Travis Murphy',
    orderDate: '2024-03-04',
    total: 156.25,
    status: 'Delivered',
    items: 3,
  },
  {
    id: 50,
    customerName: 'Crystal Bailey',
    orderDate: '2024-03-05',
    total: 298.8,
    status: 'Processing',
    items: 6,
  },
];

/**
 * Data source for the Orders view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
@Injectable()
export class OrdersDataSource extends DataSource<OrdersItem> {
  data: OrdersItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<OrdersItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: OrdersItem[]): OrdersItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: OrdersItem[]): OrdersItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'customerName':
          return compare(a.customerName, b.customerName, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'orderDate':
          return compare(a.orderDate, b.orderDate, isAsc);
        case 'total':
          return compare(a.total, b.total, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'items':
          return compare(a.items, b.items, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
