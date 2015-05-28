all:
	babel lib --out-dir dist
	lessc lib/input-slider.less > dist/input-slider.css
clean:
	rm dist/*
