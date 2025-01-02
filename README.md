# qx-filter-rule
My QuanX filter rule

# Format

Define one-by-one:

` <TYPE>, <VALUE>, <proxy|direct|reject>`

or for bulk lists, use this syntax:

```
@begin <TYPE> <proxy|direct|reject>
<values>
@end
```

#### TYPE
- host
- host-suffix
- host-wildcard
- host-keyword

#### VALUE
Domain names for the rule. Wildcards like `*` is accepted. 

# How to subscribe
- Do not subscribe to Github raw file, this repo now use a builder script.
- When github cannot be accessed, a cached version is at my cloudflare site. The file structure is identical. 