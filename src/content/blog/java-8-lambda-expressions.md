---
title: "Java 8 Lambda Expressions: A Practical Introduction"
description: "What lambda expressions are, how functional interfaces make them work, how they differ from anonymous classes, and how they simplify iterating collections."
pubDate: 2015-06-16
tags: ["Java", "Java 8", "Lambda", "Functional Programming"]
category: "Java"
draft: false
featured: false
readingTime: "8 min read"
---

## Introduction

Java is primarily an object-oriented programming language. It uses the basic principles of object orientation, and objects are first-class citizens. Behaviour is passed between different parts of a program through objects. Java 8 added some of the basic functional programming concepts, which enable more dynamic behaviour, such as treating functions as values.

Java 8 shipped [JSR-335](http://jcp.org/en/jsr/detail?id=335), which includes:

- **Lambda expressions and method references.** These let you pass behaviour around. You can pass a method to another method as an argument.
- **Enhanced interfaces and target typing.**
- **Default and static methods in interfaces.** Interfaces can now contain default behaviour. They are no longer just skeletons of abstract methods.

Lambda expressions are also called closures in functional programming. A closure is a function, or a reference to a function, together with its referencing environment. The [closure article on W3Schools](https://www.w3schools.com/js/js_function_closures.asp) explains the idea well, although it uses JavaScript.

## Functional interface

A functional interface is an interface with exactly one abstract method. You have probably used some already. These are a few interfaces from the JDK that declare only one method:

- [`java.lang.Runnable`](http://docs.oracle.com/javase/8/docs/api/java/lang/Runnable.html)
- [`java.io.FileFilter`](http://docs.oracle.com/javase/8/docs/api/java/io/FileFilter.html)
- [`java.util.Comparator`](http://docs.oracle.com/javase/8/docs/api/java/util/Comparator.html)
- [`java.util.concurrent.Callable`](http://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Callable.html)

Does a single-method interface automatically count as a functional interface? No. The rules are:

- The interface should be annotated with [`@FunctionalInterface`](https://docs.oracle.com/javase/8/docs/api/java/lang/FunctionalInterface.html). This annotation was introduced in Java 8.
- The interface should have exactly one abstract method.

The compiler reports an error if code breaks these rules. Every existing interface with a single abstract method is now annotated with `@FunctionalInterface`. If you decompile one of them, you will see the annotation.

Here is an example of a functional interface:

```java
package com.techsam.ecom.order;

@FunctionalInterface
public interface OrderProcessListener {
   void processOrder(long orderid);
}
```

Java 8 also added the [`java.util.function`](https://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html) package, which contains ready-made functional interfaces:

- [`Predicate`](https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html)
- [`Consumer`](https://docs.oracle.com/javase/8/docs/api/java/util/function/Consumer.html)
- [`Function`](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html)
- [`Supplier`](https://docs.oracle.com/javase/8/docs/api/java/util/function/Supplier.html)
- [`UnaryOperator`](https://docs.oracle.com/javase/8/docs/api/java/util/function/UnaryOperator.html)
- [`BinaryOperator`](https://docs.oracle.com/javase/8/docs/api/java/util/function/BinaryOperator.html)

You may have a few questions about functional interfaces:

1. How do you use a functional interface?
2. What is it used for?
3. Why does it have exactly one abstract method?

The rest of this article answers these.

## Lambda expressions

Lambda expressions address what I call the **vertical problem**: writing the same lines of boilerplate source code just to wrap one piece of behaviour. For example, here is a common way to create a thread:

```java
public class AnonymousThread {

   public static void main(String[] args) {
      Runnable r1 = new Runnable() {
         @Override
         public void run() {
            System.out.println("Thread A..");
         }
      };

      Thread t = new Thread(r1);
      t.start();
   }
}
```

Lines 4 to 6, which create an anonymous class and override `run()`, are the same every time. That is the vertical problem, and lambda expressions solve it.

A lambda expression is an anonymous method. Its syntax is:

```
(<argument(s)>) -> {<body>}
```

`<arguments>` is the list of parameters of the functional interface's abstract method, and `<body>` is the logic to run. The diagram below compares the lambda syntax with the anonymous class:

![Lambda expression compared with an anonymous class](/blog/java-8-lambda-expressions/lambda_expression.png)

The grey code in the diagram is no longer needed. A lambda expression can only be used where a functional interface is expected. Since Java 8, `Runnable` is a functional interface, so you can rewrite the thread example like this:

```java
public class AnonymousLambdaThread {

   public static void main(String[] args) {
      Runnable r1 = () -> {
         System.out.println("Thread A..");
      };

      Thread t = new Thread(r1);
      t.start();
   }
}
```

Here is another example using the `OrderProcessListener` interface defined above. The implementation is a lambda:

```java
package com.techsam.ecom.order.test;

import com.techsam.ecom.order.OrderProcessListener;

public class OrderProcessListenerImpl {

   public static void main(String[] args) {
      OrderProcessListener listener = (long oid) -> {
         System.out.println("Order " + oid + " process start..");
      };
      listener.processOrder(123);
   }
}
```

In this example, the value `123` is passed as the argument `oid`, and then the body runs. The question is how the body runs when you call `listener.processOrder(123)`. The answer is why a functional interface may have only one abstract method. The compiler has exactly one method to implement, so it can supply the body as that method's implementation. The diagram below shows the idea:

![How a lambda is bound to the functional interface method](/blog/java-8-lambda-expressions/lambda_example.png)

## Expression rules

Follow these rules when you write lambda expressions:

1. **A lambda can have zero, one or more parameters.**

   With no parameters, use empty parentheses:

   ```java
   Runnable r1 = () -> {
      System.out.println("Thread A..");
   };
   ```

   With one parameter, the parentheses are optional:

   ```java
   OrderProcessListener listener = (oid) -> {
      System.out.println("Order " + oid + " process start..");
   };
   ```

   or

   ```java
   OrderProcessListener listener = oid -> {
      System.out.println("Order " + oid + " process start..");
   };
   ```

   With more than one parameter, wrap them in parentheses and separate them with commas.

2. **Parameter types can be declared explicitly or inferred from context.**

   ```java
   OrderProcessListener listener = (long oid) -> {
      System.out.println("Order " + oid + " process start..");
   };
   ```

3. **The body can contain zero, one or more statements.**

   If the body is a single expression statement, you can drop the curly braces:

   ```java
   OrderProcessListener listener = oid -> System.out.println("Order " + oid + " process start..");
   ```

### Key differences between anonymous classes and lambda expressions

1. **The compiler generates different artefacts.** A lambda is compiled into a private method in the enclosing class. An anonymous class generates a new class file. For example, compiling this code:

   ```java
   package com.techsam.ecom.order.test;

   import com.techsam.ecom.order.OrderProcessListener;

   public class AnonymousTest {

      public static void main(String[] args) {
         OrderProcessListener listener = new OrderProcessListener() {
            @Override
            public void processOrder(long orderid) {
               System.out.println("Order " + orderid + " process start..");
            }
         };
         listener.processOrder(123);
      }
   }
   ```

   produces two class files: `AnonymousTest.class` and `AnonymousTest$1.class`. If you replace the anonymous class with a lambda, as in `OrderProcessListenerImpl` above, the compiler produces a single class file, `OrderProcessListenerImpl.class`, which contains a private synthetic method such as `private static void lambda$main$0(long)`.

2. **The meaning of `this` differs.** Inside an anonymous class, `this` refers to the anonymous class instance. A lambda does not introduce a new scope for `this`, so inside a lambda `this` refers to the enclosing class instance.

## Iterating collections

Here is an example of the old way of iterating a collection. Assume there is a simple `Item` class with an id, a title and a price:

```java
package com.techsam.ecom;

public class Item {
   long id;
   String title;
   Integer price;

   public Item(long id, String title, Integer price) {
      this.id = id;
      this.title = title;
      this.price = price;
   }

   public long getId() {
      return id;
   }

   public String getTitle() {
      return title;
   }

   public Integer getPrice() {
      return price;
   }
}
```

```java
package com.techsam.test;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import com.techsam.ecom.Item;

public class CollectionTest {
   public static void main(String[] args) {
      List<Item> itemList = new ArrayList<Item>();
      itemList.add(new Item(1, "iPhone 6 64GB", 299));
      itemList.add(new Item(2, "Chrome cast", 28));
      itemList.add(new Item(3, "3+2 sofa set", 1099));

      for (Item item : itemList) {
         displayItem(item);
      }
   }

   private static void displayItem(Item item) {
      Locale local = new Locale("en", "US");
      String price = NumberFormat.getCurrencyInstance(local).format(item.getPrice());
      System.out.format("%-5s %-30s %-10s%n", item.getId(), item.getTitle(), price);
   }
}
```

In this example, the iteration logic is written by hand, which is external iteration. Since Java SE 8, the iteration can be done by the JVM (internal iteration). You tell the JVM what to do for each element. The [`java.lang.Iterable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html) interface gained a new method, `forEach()`, which takes a [`java.util.function.Consumer`](https://docs.oracle.com/javase/8/docs/api/java/util/function/Consumer.html), a functional interface. Here is the same logic in the new style:

```java
package com.techsam.test;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import com.techsam.ecom.Item;

public class CollectionConsumer {
   public static void main(String[] args) {
      List<Item> itemList = new ArrayList<Item>();
      itemList.add(new Item(1, "iPhone 6 64GB", 299));
      itemList.add(new Item(2, "Chrome cast", 28));
      itemList.add(new Item(3, "3+2 sofa set", 1099));

      itemList.forEach(item -> displayItem(item));
   }

   private static void displayItem(Item item) {
      Locale local = new Locale("en", "US");
      String price = NumberFormat.getCurrencyInstance(local).format(item.getPrice());
      System.out.format("%-5s %-30s %-10s%n", item.getId(), item.getTitle(), price);
   }
}
```

Java 8 also introduced the [Stream API](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html), a more functional way to traverse and transform collections. I will cover it in a separate article.

## Key takeaway

A functional interface has exactly one abstract method, and a lambda expression is a concise implementation of that method. Lambdas remove the boilerplate of anonymous classes, and `forEach()` moves iteration into the library. Together they make many everyday Java tasks shorter and easier to read.
