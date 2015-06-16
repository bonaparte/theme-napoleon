# Bonaparte - Backend UI Framework

[DEMO Kitchen-Sink](https://github.dowjones.net/pages/adrianp/bonaparte/dist/examples/kitchen-sink)

## SUI Theme

#### Install / Use

- Copy `dist/Bonaparte/` to `your/path/to/SUI/src/themes/`
- Copy `dist/theme.config` to `your/path/to/SUI/src/`
- Build SUI.

#### Build Docs 

- Run `gulp install`
- Follow Instructions: https://github.com/Semantic-Org/Semantic-UI-Docs

## Development

__DON'T WORK IN `dist/` DIRECTLY.__

- Work in `ui/` (but don't commit _dirty_ submodules - set to _Assume Unchanged_)
- Use `gulp install` to integrate `dist/` back into `ui/` (after reinstalling/updating ui/)
- Use `gulp watch` to watch `ui/` and keep `dist/` up to date.
