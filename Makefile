all:
	babel lib --out-dir dist
	lessc lib/input-slider.less > dist/input-slider.css
	webpack -p
clean:
	rm dist/*
	rm example/bundle*
