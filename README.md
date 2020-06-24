# Prioritize

> A light ES6 wrapper on fetch to facilitate prioritization of calls.
>
> [![npm][npm]][npm-url]
[![build][build]][build-url]
[![coverage][coverage]][coverage-url]
[![deps][deps]][deps-url]
[![size][size]][size-url]
[![vulnerabilities][vulnerabilities]][vulnerabilities-url]
[![license][license]][license-url]


<br><a name="module_prioritize"></a>

## prioritize
A light wrapper on fetch to facilitate prioritization of calls.

```
npm install prioritize
```

* [prioritize](#module_prioritize)
    * [.baseUrl](#module_prioritize.baseUrl)
    * [.defaults](#module_prioritize.defaults)
    * [.fetch(url, [settings])](#module_prioritize.fetch) ⇒ <code>Promise</code>
    * [.get(url, [settings])](#module_prioritize.get) ⇒ <code>Promise</code>
    * [.patch(url, [settings])](#module_prioritize.patch) ⇒ <code>Promise</code>
    * [.put(url, [settings])](#module_prioritize.put) ⇒ <code>Promise</code>
    * [.post(url, [settings])](#module_prioritize.post) ⇒ <code>Promise</code>
    * [.delete(url, [settings])](#module_prioritize.delete) ⇒ <code>Promise</code>


<br><a name="module_prioritize.baseUrl"></a>

### prioritize.baseUrl
> A baseUrl to prepend to the url for each call to fetch

**Default**: <code>&#x27;&#x27;</code>  

<br><a name="module_prioritize.defaults"></a>

### prioritize.defaults
> Default settings for each call to fetch.

**Default**: <code>{ headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; } }</code>  

<br><a name="module_prioritize.fetch"></a>

### prioritize.fetch(url, [settings]) ⇒ <code>Promise</code>
> Prioritized call to fetch.

**Returns**: <code>Promise</code> - Should be handled like a normal call to fetch  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL to call |
| [settings] | <code>object</code> | All settings available to fetch.<br> - Adds any default settings from prioritize.defaults.<br> - settings.body is passed through JSON.stringify() if appropriate. |
| [settings.priority] | <code>string</code> | If set to "low" then this call is added to a queue until all previously added calls are complete. |


<br><a name="module_prioritize.get"></a>

### prioritize.get(url, [settings]) ⇒ <code>Promise</code>
> Shortcut to prioritize.fetch with method: 'GET'.

**Returns**: <code>Promise</code> - Should be handled like a normal call to fetch  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL to call |
| [settings] | <code>object</code> | Passed to prioritize.fetch with method: 'GET' |


<br><a name="module_prioritize.patch"></a>

### prioritize.patch(url, [settings]) ⇒ <code>Promise</code>
> Shortcut to prioritize.fetch with method: 'PATCH'.

**Returns**: <code>Promise</code> - Should be handled like a normal call to fetch  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL to call. |
| [settings] | <code>object</code> | Passed to prioritize.fetch with method: 'PATCH' |


<br><a name="module_prioritize.put"></a>

### prioritize.put(url, [settings]) ⇒ <code>Promise</code>
> Shortcut to prioritize.fetch with method: 'PUT'.

**Returns**: <code>Promise</code> - Should be handled like a normal call to fetch  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL to call |
| [settings] | <code>object</code> | Passed to prioritize.fetch with method: 'PUT' |


<br><a name="module_prioritize.post"></a>

### prioritize.post(url, [settings]) ⇒ <code>Promise</code>
> Shortcut to prioritize.fetch with method: 'POST'.

**Returns**: <code>Promise</code> - Should be handled like a normal call to fetch  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL to call |
| [settings] | <code>object</code> | Passed to prioritize.fetch with method: 'POST' |


<br><a name="module_prioritize.delete"></a>

### prioritize.delete(url, [settings]) ⇒ <code>Promise</code>
> Shortcut to prioritize.fetch with method: 'DELETE'.

**Returns**: <code>Promise</code> - Should be handled like a normal call to fetch  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL to call |
| [settings] | <code>object</code> | Passed to prioritize.fetch with method: 'DELETE' |


[npm]: https://img.shields.io/npm/v/prioritize.svg
[npm-url]: https://npmjs.com/package/prioritize
[build]: https://travis-ci.org/DarrenPaulWright/prioritize.svg?branch&#x3D;master
[build-url]: https://travis-ci.org/DarrenPaulWright/prioritize
[coverage]: https://coveralls.io/repos/github/DarrenPaulWright/prioritize/badge.svg?branch&#x3D;master
[coverage-url]: https://coveralls.io/github/DarrenPaulWright/prioritize?branch&#x3D;master
[deps]: https://david-dm.org/darrenpaulwright/prioritize.svg
[deps-url]: https://david-dm.org/darrenpaulwright/prioritize
[size]: https://packagephobia.now.sh/badge?p&#x3D;prioritize
[size-url]: https://packagephobia.now.sh/result?p&#x3D;prioritize
[vulnerabilities]: https://snyk.io/test/github/DarrenPaulWright/prioritize/badge.svg?targetFile&#x3D;package.json
[vulnerabilities-url]: https://snyk.io/test/github/DarrenPaulWright/prioritize?targetFile&#x3D;package.json
[license]: https://img.shields.io/github/license/DarrenPaulWright/prioritize.svg
[license-url]: https://npmjs.com/package/prioritize/LICENSE.md
