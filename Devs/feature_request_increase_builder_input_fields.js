<script>
    window.addEventListener("load", () => {
        // add attribute for styling
        document.getElementById('bricks-panel-inner').setAttribute('data-increase-input-width', '');
    })
</script>    

<style>
    #bricks-panel-inner[data-increase-input-width] div[data-control="spacing"] .handle:before {
        display: none;
    }

    #bricks-panel-inner[data-increase-input-width] div[data-control="spacing"]:not([controlkey="width"]):not([controlkey="values"]):not([controlkey="radius"]) .handle:hover {
        background-color: var(--builder-bg-3);
    }

    #bricks-panel-inner[data-increase-input-width] div[data-control="spacing"]:not([controlkey="width"]):not([controlkey="radius"]):not([controlkey="mobileMenuPosition"]):not([controlkey="carouselIconPosition"]):not([controlkey="videoIconPosition"]):not([controlkey="mobileMenuToggleClosePosition"]):not([controlkey="caretPosition"]) .handle.top, 
    #bricks-panel-inner[data-increase-input-width] div[data-control="spacing"]:not([controlkey="width"]):not([controlkey="radius"]):not([controlkey="mobileMenuPosition"]):not([controlkey="carouselIconPosition"]):not([controlkey="videoIconPosition"]):not([controlkey="mobileMenuToggleClosePosition"]):not([controlkey="caretPosition"]) .handle.bottom {
        left: 0;
        right: 0;
        background-color: var(--builder-bg-2);
        border-radius: 4px;
        border: 2px solid var(--builder-bg);
    }

    #bricks-panel-inner[data-increase-input-width] div[data-control="spacing"]:not([controlkey="width"]):not([controlkey="radius"]):not([controlkey="mobileMenuPosition"]):not([controlkey="carouselIconPosition"]):not([controlkey="videoIconPosition"]):not([controlkey="mobileMenuToggleClosePosition"]):not([controlkey="caretPosition"]) .handle.left, 
    #bricks-panel-inner[data-increase-input-width] div[data-control="spacing"]:not([controlkey="width"]):not([controlkey="radius"]):not([controlkey="mobileMenuPosition"]):not([controlkey="carouselIconPosition"]):not([controlkey="videoIconPosition"]):not([controlkey="mobileMenuToggleClosePosition"]):not([controlkey="caretPosition"]) .handle.right {
        width: 50%;
        background-color: var(--builder-bg-2);
        border-radius: 4px;
        border: 2px solid var(--builder-bg);
    }

    #bricks-panel-inner[data-increase-input-width] .control-inline > div[data-control=number], 
    #bricks-panel-inner[data-increase-input-width] .control-inline > div[data-control=text] {
        flex-basis: 50%;
    }

    #bricks-panel-inner[data-increase-input-width] .control-small > div[data-control=number], 
    #bricks-panel-inner[data-increase-input-width] .control-small > div[data-control=text] {
        max-width: unset;
        width: unset;
        flex-shrink: 0;
        flex-grow: 0;
    }

    #bricks-panel-inner[data-increase-input-width] div[data-control=number]:focus-within, 
    #bricks-panel-inner[data-increase-input-width] div[data-control=text]:focus-within {
        flex-grow: 1;
    }

    #bricks-panel-inner[data-increase-input-width] div[data-controlkey] label, 
    #bricks-panel-inner[data-increase-input-width] li[data-controlkey] label {
        flex-shrink: 0;
    }
</style>
