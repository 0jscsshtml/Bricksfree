<style>
    #bricks-structure[data-draggable-panel] {
        padding-left: 10px
    }
    #xx-panel-resizable {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 10px;
        height: 100%;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: col-resize;
    }
    #xx-panel-resizable:hover {
        background-color: var(--builder-bg-3);
        opacity: 1;
    }
</style>

<script>
    window.addEventListener("load", () => {
        // get Bricks vue properties
        var vueGlobal   = document.querySelector('.brx-body').__vue_app__.config.globalProperties;

        // if user has full access to Builder
        if ( vueGlobal.$_state.fullAccess ) {

            // get Structure Panel and Preview Panel elements
            const structurePanel = document.getElementById('bricks-structure'),
				          previewPanel 	 = document.getElementById('bricks-preview');

            // add attribute for styling      
			      structurePanel.setAttribute('data-draggable-panel', '');      

            // dragging state
            var panelIsResizing = false,
                panelInitialX   = 0;

            // create draggable element
			      let div = document.createElement('div');
			      div.id = 'xx-panel-resizable';
			      structurePanel.prepend(div);
            const dragHandle = structurePanel.children[0];

            // set Structure Panel size on page load
            const structurePanelWidth = localStorage.getItem('xx_structure_panel_width');
            
      			if (structurePanelWidth) {
              dragHandle.style.right = `${structurePanelWidth - 10}px`;
              // set Structure Panel width
      				structurePanel.style.width = `${structurePanelWidth}px`;
              // update Preview Panel inline style
      				previewPanel.style.marginRight = `${structurePanelWidth}px`;
      			}

            function updateResize(e) {
                if (panelIsResizing) {
                    const offsetX = panelInitialX - e.clientX,
                          newWidth = Math.max(300, structurePanel.offsetWidth + offsetX); // min-wdth 300px

                    dragHandle.style.right = `${newWidth - 10}px`;
                    structurePanel.style.width = `${newWidth}px`;
                    previewPanel.style.marginRight = `${newWidth}px`;
                    localStorage.setItem('xx_structure_panel_width', newWidth);
                    panelInitialX = e.clientX;
                    requestAnimationFrame(() => updateResize(e));
                }
            }
            
            // in dragging
            function handleMouseMove(e) {
                if (panelIsResizing) {
                    updateResize(e);
                }
            }
    
            // stop dragging
            function handleMouseUp() {
                previewPanel.classList.remove('resizing-panel');
                panelIsResizing = false;
                dragHandle.style.cursor = 'col-resize';

                // remove drag listener
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }

            dragHandle.addEventListener('mousedown', (e) => {
				      e.preventDefault();

              // add class on Preview Panel while dragging
				      previewPanel.classList.add('resizing-panel');
              // set dragging state to true
				      panelIsResizing = true;
              // get initial mouse position
              panelInitialX = e.clientX;
				      dragHandle.style.cursor = 'col-resize';

                // call dragging function
      				document.addEventListener('mousemove', handleMouseMove);
      				document.addEventListener('mouseup', handleMouseUp);
      				requestAnimationFrame(() => updateResize(e));
      			});

        }
    })
</script>    
