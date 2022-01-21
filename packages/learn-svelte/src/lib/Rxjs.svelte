<script lang="ts">
  import { Observable } from 'rxjs';
  const observable = new Observable(subscribe => {
    subscribe.next(1);
    subscribe.next(2);
    subscribe.next(3);
    setTimeout(() => {
      subscribe.next(4);
      subscribe.complete();
    }, 1000);
  })
  console.log("before subscribe")
  observable.subscribe({
    next(num) {
      console.log("get value " + num);
    },
    error(err) {
      console.log("get error " + err);
    },
    complete() { console.log("complete subscribe")}
  })
</script>