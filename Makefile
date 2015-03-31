all:
	jsx --no-cache-dir lib dist
	lessc lib/input-slider.less > dist/input-slider.css
clean:
	rm dist/*
