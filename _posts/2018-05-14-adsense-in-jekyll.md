---
layout: post
title:  "AdSense in Jekyll"
image: /assets/22IMui4.jpg
date:   2018-04-01 12:30:00 +0000
author: Dale
intro: How to add Google AdSense to your Jekyll site the right way.
categories: adsense jekyll
permalink: /adSense-in-jekyll/
---

Jekyll is a great way to write a blog because it's quick to get started, easy to maintain and if like myself you use [Github Pages](https://pages.github.com/) it's also free to host.
But how do you start monetising your new blog to get some passive income from your readers?

There are many ways to do this with ads and affiliate marketing but probably the most popular is Google AdSense, it gives you tons of analytics and also offers plenty of customisation so that it looks and feels like part of your site.

If you don't have and AdSense account already and have only just started your blog or haven't yet created much content you may find this affects your application for an account as they require that you have enough content and not be "under construction". I found that a few blog posts was enough to get me accepted.

If you haven't got an AdSense account yet sign up here [google.co.uk/adsense](https://www.google.co.uk/adsense)

When you first sign up for Google AdSense you will be told to add some script just before the closing head tag, You can just add this straight into your head include however there is a much nicer way to do this that can also make it easier for adding custom "ad units", more on that later.

```yaml
# _config.yml
google_adsense: ca-pub-0000000000000000
```
Start by adding a global config setting called "google_adsense" to your config file.
In the code that AdSense provides you'll find you're publisher ID that starts with "ca-pub", you can also find this in AdSense by going to Settings > Account > Account information.
Add this as a string to your "google_adsense" setting.

```html
<!-- _includes/google-adsense.html -->
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
(adsbygoogle = window.adsbygoogle || []).push({
  google_ad_client: "{{ site.google_adsense }}",
  enable_page_level_ads: true
});
</script>
```
Next create a new google-adsense.html in your includes then paste the code that AdSense provided. Replace your publisher ID with the global setting you created earlier.

{% raw %}
```html
<!-- _includes/head.html -->
<head>
  <!-- ... -->
  {% if jekyll.environment == 'production' and page.layout == 'post' and site.google_adsense %}
  {% include google-adsense.html %}
  {% endif %}
</head>
```
{% endraw %}

Now in your head you can include the "google-adsense.html".
This by it self is enough to get AdSense working in your site and if you look at the template above it will only display in production environment on blog posts not on contact pages etc.
If all went well you should see an ad like the one for this article below.

{% include article-adsense.html %}

The above example uses "auto ads" which lets google automatically place ads where it thinks is best, you do have some control over this but the idea with "auto ads" is to let google take care of placement and ad type for you.
If this is fine for you then great you are done! however I prefer to have a little more control over ads which is why I'm also going to show how I prefer to do it.

<img src="https://i.imgur.com/wCilP5r.jpg" alt="Google ad unit templates" title="Google ad unit templates" width="800" height="347" />

I prefer to add my own "ad unit", there are a few to choose from but the most popular are "in-article ads" and "text & display ads" Listing all of the difference goes beyond the scope of this article so although not a hard rule I'll just say if you want ads in your content for example half way through your blog post use "in-article ads" otherwise if you wanted it at the start, end or even in a sidebar use "text & display ads".

<img src="https://i.imgur.com/XGM9tEl.jpg" alt="Google ad unit create" title="Google ad unit create" width="800" height="520" />

If you create a new ad unit select the type you want, I'm going to use an "in-article ad" in this example, You will see a page that lets you customise the look and feel, adjust these settings to meet your needs and click "Save and get code".

This will give you a code snippet similar to the previous auto ads example, repeat the same steps as above (create a include with code snippet, replace your publisher id with the "google_adsense" config variable).

{% raw %}
```html
<!-- _includes/article-adsense.html -->
{% if jekyll.environment == 'production' and page.layout == 'post' and site.google_adsense %}
  <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  <ins class="adsbygoogle"
  style="display:block; text-align:center;"
  data-ad-layout="in-article"
  data-ad-format="fluid"
  data-ad-client="{{ site.google_adsense }}"
  data-ad-slot="9200453742"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
{% endif %}
```
{% endraw %}

I have added the environment and page layout check inside the include instead of where I use it, this is because we're going to be putting this include in the middle of blog posts and want to minimise the amount of unrelated logic and abstract the ad code away into this include.

You may have also noticed that the first script tag is the same as the one from the auto ads snippet, I recommend that whether or not you also use auto ads to only include this script tag once in the head. This is because you may decide to have more than one ad in a post which means this include would have included it more than once.

```html
<!-- _includes/head.html -->
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
```

{% raw %}
```html
<!-- _includes/article-adsense.html -->
{% if jekyll.environment == 'production' and page.layout == 'post' and site.google_adsense %}
  <ins class="adsbygoogle"
  style="display:block; text-align:center;"
  data-ad-layout="in-article"
  data-ad-format="fluid"
  data-ad-client="{{ site.google_adsense }}"
  data-ad-slot="9200453742"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
{% endif %}
```

```html
<!-- _posts/my-blog-post.md -->
<p>Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
{% include article-adsense.html %}
<p>Donec tristique, dui ac interdum...</p>
```
{% endraw %}

Next you just include "article-adsense.html" anywhere you want to place an ad.
If you wanted to try out other ad units you can follow the same steps and create new includes for them and have full control over where they are placed.

Congratulations! you have Google AdSense working now you just need to promote your blog posts to get more people reading them, the more quality traffic you have on your site the higher your potential earnings can be, who knows perhaps you can earn enough to cover your coffee addiction or if your lucky it could be even be your primary income!
