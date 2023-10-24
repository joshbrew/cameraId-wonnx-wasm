var wasm;var heap=new Array(128).fill(void 0);heap.push(void 0,null,true,false);function getObject(idx){return heap[idx]}var heap_next=heap.length;function dropObject(idx){if(idx<132)return;heap[idx]=heap_next;heap_next=idx}function takeObject(idx){const ret=getObject(idx);dropObject(idx);return ret}var cachedTextDecoder=new TextDecoder("utf-8",{ignoreBOM:true,fatal:true});cachedTextDecoder.decode();var cachedUint8Memory0=null;function getUint8Memory0(){if(cachedUint8Memory0===null||cachedUint8Memory0.byteLength===0){cachedUint8Memory0=new Uint8Array(wasm.memory.buffer)}return cachedUint8Memory0}function getStringFromWasm0(ptr,len){return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr,ptr+len))}function addHeapObject(obj){if(heap_next===heap.length)heap.push(heap.length+1);const idx=heap_next;heap_next=heap[idx];heap[idx]=obj;return idx}var WASM_VECTOR_LEN=0;var cachedTextEncoder=new TextEncoder("utf-8");var encodeString=typeof cachedTextEncoder.encodeInto==="function"?function(arg,view){return cachedTextEncoder.encodeInto(arg,view)}:function(arg,view){const buf=cachedTextEncoder.encode(arg);view.set(buf);return{read:arg.length,written:buf.length}};function passStringToWasm0(arg,malloc,realloc){if(realloc===void 0){const buf=cachedTextEncoder.encode(arg);const ptr2=malloc(buf.length);getUint8Memory0().subarray(ptr2,ptr2+buf.length).set(buf);WASM_VECTOR_LEN=buf.length;return ptr2}let len=arg.length;let ptr=malloc(len);const mem=getUint8Memory0();let offset=0;for(;offset<len;offset++){const code=arg.charCodeAt(offset);if(code>127)break;mem[ptr+offset]=code}if(offset!==len){if(offset!==0){arg=arg.slice(offset)}ptr=realloc(ptr,len,len=offset+arg.length*3);const view=getUint8Memory0().subarray(ptr+offset,ptr+len);const ret=encodeString(arg,view);offset+=ret.written}WASM_VECTOR_LEN=offset;return ptr}function isLikeNone(x){return x===void 0||x===null}var cachedInt32Memory0=null;function getInt32Memory0(){if(cachedInt32Memory0===null||cachedInt32Memory0.byteLength===0){cachedInt32Memory0=new Int32Array(wasm.memory.buffer)}return cachedInt32Memory0}function debugString(val){const type=typeof val;if(type=="number"||type=="boolean"||val==null){return`${val}`}if(type=="string"){return`"${val}"`}if(type=="symbol"){const description=val.description;if(description==null){return"Symbol"}else{return`Symbol(${description})`}}if(type=="function"){const name=val.name;if(typeof name=="string"&&name.length>0){return`Function(${name})`}else{return"Function"}}if(Array.isArray(val)){const length=val.length;let debug="[";if(length>0){debug+=debugString(val[0])}for(let i=1;i<length;i++){debug+=", "+debugString(val[i])}debug+="]";return debug}const builtInMatches=/\[object ([^\]]+)\]/.exec(toString.call(val));let className;if(builtInMatches.length>1){className=builtInMatches[1]}else{return toString.call(val)}if(className=="Object"){try{return"Object("+JSON.stringify(val)+")"}catch(_){return"Object"}}if(val instanceof Error){return`${val.name}: ${val.message}
${val.stack}`}return className}function makeMutClosure(arg0,arg1,dtor,f){const state={a:arg0,b:arg1,cnt:1,dtor};const real=(...args)=>{state.cnt++;const a=state.a;state.a=0;try{return f(a,state.b,...args)}finally{if(--state.cnt===0){wasm.__wbindgen_export_2.get(state.dtor)(a,state.b)}else{state.a=a}}};real.original=state;return real}function __wbg_adapter_30(arg0,arg1,arg2){wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h379b29d191c696a5(arg0,arg1,addHeapObject(arg2))}function __wbg_adapter_35(arg0,arg1,arg2){wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__ha85f54a9d7f102e5(arg0,arg1,addHeapObject(arg2))}var cachedFloat32Memory0=null;function getFloat32Memory0(){if(cachedFloat32Memory0===null||cachedFloat32Memory0.byteLength===0){cachedFloat32Memory0=new Float32Array(wasm.memory.buffer)}return cachedFloat32Memory0}function passArrayF32ToWasm0(arg,malloc){const ptr=malloc(arg.length*4);getFloat32Memory0().set(arg,ptr/4);WASM_VECTOR_LEN=arg.length;return ptr}function passArray8ToWasm0(arg,malloc){const ptr=malloc(arg.length*1);getUint8Memory0().set(arg,ptr/1);WASM_VECTOR_LEN=arg.length;return ptr}function _assertClass(instance,klass){if(!(instance instanceof klass)){throw new Error(`expected instance of ${klass.name}`)}return instance.ptr}function handleError(f,args){try{return f.apply(this,args)}catch(e){wasm.__wbindgen_exn_store(addHeapObject(e))}}var cachedUint32Memory0=null;function getUint32Memory0(){if(cachedUint32Memory0===null||cachedUint32Memory0.byteLength===0){cachedUint32Memory0=new Uint32Array(wasm.memory.buffer)}return cachedUint32Memory0}function getArrayU32FromWasm0(ptr,len){return getUint32Memory0().subarray(ptr/4,ptr/4+len)}function __wbg_adapter_332(arg0,arg1,arg2,arg3){wasm.wasm_bindgen__convert__closures__invoke2_mut__h3af64c9774cbde22(arg0,arg1,addHeapObject(arg2),addHeapObject(arg3))}var Input=class _Input{static __wrap(ptr){const obj=Object.create(_Input.prototype);obj.ptr=ptr;return obj}__destroy_into_raw(){const ptr=this.ptr;this.ptr=0;return ptr}free(){const ptr=this.__destroy_into_raw();wasm.__wbg_input_free(ptr)}constructor(){const ret=wasm.input_new();return _Input.__wrap(ret)}insert(input_name,value){const ptr0=passStringToWasm0(input_name,wasm.__wbindgen_malloc,wasm.__wbindgen_realloc);const len0=WASM_VECTOR_LEN;const ptr1=passArrayF32ToWasm0(value,wasm.__wbindgen_malloc);const len1=WASM_VECTOR_LEN;wasm.input_insert(this.ptr,ptr0,len0,ptr1,len1)}};var Session=class _Session{static __wrap(ptr){const obj=Object.create(_Session.prototype);obj.ptr=ptr;return obj}__destroy_into_raw(){const ptr=this.ptr;this.ptr=0;return ptr}free(){const ptr=this.__destroy_into_raw();wasm.__wbg_session_free(ptr)}static fromBytes(bytes){const ptr0=passArray8ToWasm0(bytes,wasm.__wbindgen_malloc);const len0=WASM_VECTOR_LEN;const ret=wasm.session_fromBytes(ptr0,len0);return takeObject(ret)}run(input){_assertClass(input,Input);const ret=wasm.session_run(this.ptr,input.ptr);return takeObject(ret)}};var SessionError=class _SessionError{static __wrap(ptr){const obj=Object.create(_SessionError.prototype);obj.ptr=ptr;return obj}__destroy_into_raw(){const ptr=this.ptr;this.ptr=0;return ptr}free(){const ptr=this.__destroy_into_raw();wasm.__wbg_sessionerror_free(ptr)}toString(){try{const retptr=wasm.__wbindgen_add_to_stack_pointer(-16);wasm.sessionerror_toString(retptr,this.ptr);var r0=getInt32Memory0()[retptr/4+0];var r1=getInt32Memory0()[retptr/4+1];return getStringFromWasm0(r0,r1)}finally{wasm.__wbindgen_add_to_stack_pointer(16);wasm.__wbindgen_free(r0,r1)}}};async function load(module,imports){if(typeof Response==="function"&&module instanceof Response){if(typeof WebAssembly.instantiateStreaming==="function"){try{return await WebAssembly.instantiateStreaming(module,imports)}catch(e){if(module.headers.get("Content-Type")!="application/wasm"){console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",e)}else{throw e}}}const bytes=await module.arrayBuffer();return await WebAssembly.instantiate(bytes,imports)}else{const instance=await WebAssembly.instantiate(module,imports);if(instance instanceof WebAssembly.Instance){return{instance,module}}else{return instance}}}function getImports(){const imports={};imports.wbg={};imports.wbg.__wbindgen_is_string=function(arg0){const ret=typeof getObject(arg0)==="string";return ret};imports.wbg.__wbg_session_new=function(arg0){const ret=Session.__wrap(arg0);return addHeapObject(ret)};imports.wbg.__wbg_sessionerror_new=function(arg0){const ret=SessionError.__wrap(arg0);return addHeapObject(ret)};imports.wbg.__wbindgen_object_drop_ref=function(arg0){takeObject(arg0)};imports.wbg.__wbindgen_error_new=function(arg0,arg1){const ret=new Error(getStringFromWasm0(arg0,arg1));return addHeapObject(ret)};imports.wbg.__wbindgen_bigint_from_i64=function(arg0){const ret=arg0;return addHeapObject(ret)};imports.wbg.__wbindgen_number_new=function(arg0){const ret=arg0;return addHeapObject(ret)};imports.wbg.__wbindgen_object_clone_ref=function(arg0){const ret=getObject(arg0);return addHeapObject(ret)};imports.wbg.__wbindgen_string_new=function(arg0,arg1){const ret=getStringFromWasm0(arg0,arg1);return addHeapObject(ret)};imports.wbg.__wbindgen_is_object=function(arg0){const val=getObject(arg0);const ret=typeof val==="object"&&val!==null;return ret};imports.wbg.__wbindgen_string_get=function(arg0,arg1){const obj=getObject(arg1);const ret=typeof obj==="string"?obj:void 0;var ptr0=isLikeNone(ret)?0:passStringToWasm0(ret,wasm.__wbindgen_malloc,wasm.__wbindgen_realloc);var len0=WASM_VECTOR_LEN;getInt32Memory0()[arg0/4+1]=len0;getInt32Memory0()[arg0/4+0]=ptr0};imports.wbg.__wbg_set_841ac57cff3d672b=function(arg0,arg1,arg2){getObject(arg0)[takeObject(arg1)]=takeObject(arg2)};imports.wbg.__wbg_new_abda76e883ba8a5f=function(){const ret=new Error;return addHeapObject(ret)};imports.wbg.__wbg_stack_658279fe44541cf6=function(arg0,arg1){const ret=getObject(arg1).stack;const ptr0=passStringToWasm0(ret,wasm.__wbindgen_malloc,wasm.__wbindgen_realloc);const len0=WASM_VECTOR_LEN;getInt32Memory0()[arg0/4+1]=len0;getInt32Memory0()[arg0/4+0]=ptr0};imports.wbg.__wbg_error_f851667af71bcfc6=function(arg0,arg1){try{console.error(getStringFromWasm0(arg0,arg1))}finally{wasm.__wbindgen_free(arg0,arg1)}};imports.wbg.__wbindgen_cb_drop=function(arg0){const obj=takeObject(arg0).original;if(obj.cnt--==1){obj.a=0;return true}const ret=false;return ret};imports.wbg.__wbg_Window_ec3891e998206ccf=function(arg0){const ret=getObject(arg0).Window;return addHeapObject(ret)};imports.wbg.__wbindgen_is_undefined=function(arg0){const ret=getObject(arg0)===void 0;return ret};imports.wbg.__wbg_WorkerGlobalScope_05d4962a4fb54c6a=function(arg0){const ret=getObject(arg0).WorkerGlobalScope;return addHeapObject(ret)};imports.wbg.__wbg_instanceof_Window_e266f02eee43b570=function(arg0){let result;try{result=getObject(arg0)instanceof Window}catch{result=false}const ret=result;return ret};imports.wbg.__wbg_document_950215a728589a2d=function(arg0){const ret=getObject(arg0).document;return isLikeNone(ret)?0:addHeapObject(ret)};imports.wbg.__wbg_navigator_b18e629f7f0b75fa=function(arg0){const ret=getObject(arg0).navigator;return addHeapObject(ret)};imports.wbg.__wbg_querySelectorAll_608b5716e2a3baf0=function(){return handleError(function(arg0,arg1,arg2){const ret=getObject(arg0).querySelectorAll(getStringFromWasm0(arg1,arg2));return addHeapObject(ret)},arguments)};imports.wbg.__wbg_getBindGroupLayout_7478e25935b9d2e8=function(arg0,arg1){const ret=getObject(arg0).getBindGroupLayout(arg1>>>0);return addHeapObject(ret)};imports.wbg.__wbg_message_bf68023e199aaf1a=function(arg0,arg1){const ret=getObject(arg1).message;const ptr0=passStringToWasm0(ret,wasm.__wbindgen_malloc,wasm.__wbindgen_realloc);const len0=WASM_VECTOR_LEN;getInt32Memory0()[arg0/4+1]=len0;getInt32Memory0()[arg0/4+0]=ptr0};imports.wbg.__wbg_getBindGroupLayout_2eed24cc41e600f2=function(arg0,arg1){const ret=getObject(arg0).getBindGroupLayout(arg1>>>0);return addHeapObject(ret)};imports.wbg.__wbg_maxTextureDimension1D_7ad88ba70060cbc0=function(arg0){const ret=getObject(arg0).maxTextureDimension1D;return ret};imports.wbg.__wbg_maxTextureDimension2D_f618a5b67f3d6545=function(arg0){const ret=getObject(arg0).maxTextureDimension2D;return ret};imports.wbg.__wbg_maxTextureDimension3D_4aaaeaa186a0e6ae=function(arg0){const ret=getObject(arg0).maxTextureDimension3D;return ret};imports.wbg.__wbg_maxTextureArrayLayers_c40007424124dbea=function(arg0){const ret=getObject(arg0).maxTextureArrayLayers;return ret};imports.wbg.__wbg_maxBindGroups_82450319f50609a5=function(arg0){const ret=getObject(arg0).maxBindGroups;return ret};imports.wbg.__wbg_maxBindingsPerBindGroup_c1a3b5bd8ac5cb61=function(arg0){const ret=getObject(arg0).maxBindingsPerBindGroup;return ret};imports.wbg.__wbg_maxDynamicUniformBuffersPerPipelineLayout_e15f23e479647a3c=function(arg0){const ret=getObject(arg0).maxDynamicUniformBuffersPerPipelineLayout;return ret};imports.wbg.__wbg_maxDynamicStorageBuffersPerPipelineLayout_9a704b831261dd49=function(arg0){const ret=getObject(arg0).maxDynamicStorageBuffersPerPipelineLayout;return ret};imports.wbg.__wbg_maxSampledTexturesPerShaderStage_093bd707872fbcf6=function(arg0){const ret=getObject(arg0).maxSampledTexturesPerShaderStage;return ret};imports.wbg.__wbg_maxSamplersPerShaderStage_18e430a6b534706b=function(arg0){const ret=getObject(arg0).maxSamplersPerShaderStage;return ret};imports.wbg.__wbg_maxStorageBuffersPerShaderStage_c4d0407e3a3143a4=function(arg0){const ret=getObject(arg0).maxStorageBuffersPerShaderStage;return ret};imports.wbg.__wbg_maxStorageTexturesPerShaderStage_fb28b3ff3f567608=function(arg0){const ret=getObject(arg0).maxStorageTexturesPerShaderStage;return ret};imports.wbg.__wbg_maxUniformBuffersPerShaderStage_1243616ab1b9c3ba=function(arg0){const ret=getObject(arg0).maxUniformBuffersPerShaderStage;return ret};imports.wbg.__wbg_maxUniformBufferBindingSize_66afb2e3116f05a1=function(arg0){const ret=getObject(arg0).maxUniformBufferBindingSize;return ret};imports.wbg.__wbg_maxStorageBufferBindingSize_4c14c6ce7bff64df=function(arg0){const ret=getObject(arg0).maxStorageBufferBindingSize;return ret};imports.wbg.__wbg_maxVertexBuffers_0abef34c4633ebff=function(arg0){const ret=getObject(arg0).maxVertexBuffers;return ret};imports.wbg.__wbg_maxVertexAttributes_fae4e285196f3349=function(arg0){const ret=getObject(arg0).maxVertexAttributes;return ret};imports.wbg.__wbg_maxVertexBufferArrayStride_176fe097c5c78eeb=function(arg0){const ret=getObject(arg0).maxVertexBufferArrayStride;return ret};imports.wbg.__wbg_createView_d0df6318b34e3b5d=function(arg0,arg1){const ret=getObject(arg0).createView(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_destroy_95a7ca8088f60c81=function(arg0){getObject(arg0).destroy()};imports.wbg.__wbg_setwidth_81c62bc806e0a727=function(arg0,arg1){getObject(arg0).width=arg1>>>0};imports.wbg.__wbg_setheight_98cf0db22c40ef07=function(arg0,arg1){getObject(arg0).height=arg1>>>0};imports.wbg.__wbg_getContext_3ae404b649cf9287=function(){return handleError(function(arg0,arg1,arg2){const ret=getObject(arg0).getContext(getStringFromWasm0(arg1,arg2));return isLikeNone(ret)?0:addHeapObject(ret)},arguments)};imports.wbg.__wbg_copyExternalImageToTexture_446ccb6ede6d3b9d=function(arg0,arg1,arg2,arg3){getObject(arg0).copyExternalImageToTexture(getObject(arg1),getObject(arg2),getObject(arg3))};imports.wbg.__wbg_submit_145accdc4854b69b=function(arg0,arg1){getObject(arg0).submit(getObject(arg1))};imports.wbg.__wbg_writeBuffer_deae9eef1958337f=function(arg0,arg1,arg2,arg3,arg4,arg5){getObject(arg0).writeBuffer(getObject(arg1),arg2,getObject(arg3),arg4,arg5)};imports.wbg.__wbg_writeTexture_a747d2eb64753216=function(arg0,arg1,arg2,arg3,arg4){getObject(arg0).writeTexture(getObject(arg1),getObject(arg2),getObject(arg3),getObject(arg4))};imports.wbg.__wbg_end_90bec30eeecaac54=function(arg0){getObject(arg0).end()};imports.wbg.__wbg_executeBundles_0077022f3437c3d1=function(arg0,arg1){getObject(arg0).executeBundles(getObject(arg1))};imports.wbg.__wbg_setBlendConstant_d2a884924792b10d=function(arg0,arg1){getObject(arg0).setBlendConstant(getObject(arg1))};imports.wbg.__wbg_setScissorRect_0f47f59bef76ed44=function(arg0,arg1,arg2,arg3,arg4){getObject(arg0).setScissorRect(arg1>>>0,arg2>>>0,arg3>>>0,arg4>>>0)};imports.wbg.__wbg_setStencilReference_cb3b8b016cd2622f=function(arg0,arg1){getObject(arg0).setStencilReference(arg1>>>0)};imports.wbg.__wbg_setViewport_f78ce720ad1bbf1c=function(arg0,arg1,arg2,arg3,arg4,arg5,arg6){getObject(arg0).setViewport(arg1,arg2,arg3,arg4,arg5,arg6)};imports.wbg.__wbg_setBindGroup_799966434e921168=function(arg0,arg1,arg2,arg3,arg4,arg5,arg6){getObject(arg0).setBindGroup(arg1>>>0,getObject(arg2),getArrayU32FromWasm0(arg3,arg4),arg5,arg6>>>0)};imports.wbg.__wbg_draw_da079c427d4e1307=function(arg0,arg1,arg2,arg3,arg4){getObject(arg0).draw(arg1>>>0,arg2>>>0,arg3>>>0,arg4>>>0)};imports.wbg.__wbg_drawIndexed_01e94df58ffbd134=function(arg0,arg1,arg2,arg3,arg4,arg5){getObject(arg0).drawIndexed(arg1>>>0,arg2>>>0,arg3>>>0,arg4,arg5>>>0)};imports.wbg.__wbg_drawIndexedIndirect_30c61d057fe6c676=function(arg0,arg1,arg2){getObject(arg0).drawIndexedIndirect(getObject(arg1),arg2)};imports.wbg.__wbg_drawIndirect_bc41e9283103bb4c=function(arg0,arg1,arg2){getObject(arg0).drawIndirect(getObject(arg1),arg2)};imports.wbg.__wbg_setIndexBuffer_90124d34472bb0a7=function(arg0,arg1,arg2,arg3){getObject(arg0).setIndexBuffer(getObject(arg1),takeObject(arg2),arg3)};imports.wbg.__wbg_setIndexBuffer_babf4a1ed7c145da=function(arg0,arg1,arg2,arg3,arg4){getObject(arg0).setIndexBuffer(getObject(arg1),takeObject(arg2),arg3,arg4)};imports.wbg.__wbg_setPipeline_4b1f6ab51617f980=function(arg0,arg1){getObject(arg0).setPipeline(getObject(arg1))};imports.wbg.__wbg_setVertexBuffer_f6c24e543d847f4c=function(arg0,arg1,arg2,arg3){getObject(arg0).setVertexBuffer(arg1>>>0,getObject(arg2),arg3)};imports.wbg.__wbg_setVertexBuffer_f0051e8d07a2b846=function(arg0,arg1,arg2,arg3,arg4){getObject(arg0).setVertexBuffer(arg1>>>0,getObject(arg2),arg3,arg4)};imports.wbg.__wbg_instanceof_GpuCanvasContext_ed167d7e4f64d6b8=function(arg0){let result;try{result=getObject(arg0)instanceof GPUCanvasContext}catch{result=false}const ret=result;return ret};imports.wbg.__wbg_configure_2eba1e396591bdd7=function(arg0,arg1){getObject(arg0).configure(getObject(arg1))};imports.wbg.__wbg_getCurrentTexture_0f26ea6da8c0f77c=function(arg0){const ret=getObject(arg0).getCurrentTexture();return addHeapObject(ret)};imports.wbg.__wbg_error_fa1d961145d97de6=function(arg0){const ret=getObject(arg0).error;return addHeapObject(ret)};imports.wbg.__wbg_gpu_383beebfe7730ae8=function(arg0){const ret=getObject(arg0).gpu;return addHeapObject(ret)};imports.wbg.__wbg_size_6cddfc5f9d59d2be=function(arg0){const ret=getObject(arg0).size;return ret};imports.wbg.__wbg_usage_57ae373f36ab0f1b=function(arg0){const ret=getObject(arg0).usage;return ret};imports.wbg.__wbg_destroy_182829b5d1c03548=function(arg0){getObject(arg0).destroy()};imports.wbg.__wbg_getMappedRange_33ceebd7bbe29781=function(arg0,arg1,arg2){const ret=getObject(arg0).getMappedRange(arg1,arg2);return addHeapObject(ret)};imports.wbg.__wbg_mapAsync_10d0f6703ef03e7b=function(arg0,arg1,arg2,arg3){const ret=getObject(arg0).mapAsync(arg1>>>0,arg2,arg3);return addHeapObject(ret)};imports.wbg.__wbg_unmap_ae21c65ca7ae9598=function(arg0){getObject(arg0).unmap()};imports.wbg.__wbg_finish_bd6db27f8d9ac0ae=function(arg0){const ret=getObject(arg0).finish();return addHeapObject(ret)};imports.wbg.__wbg_finish_a20832e5ef22d930=function(arg0,arg1){const ret=getObject(arg0).finish(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_setBindGroup_964ebeee1be76825=function(arg0,arg1,arg2,arg3,arg4,arg5,arg6){getObject(arg0).setBindGroup(arg1>>>0,getObject(arg2),getArrayU32FromWasm0(arg3,arg4),arg5,arg6>>>0)};imports.wbg.__wbg_draw_7eb5cb9d384aea7b=function(arg0,arg1,arg2,arg3,arg4){getObject(arg0).draw(arg1>>>0,arg2>>>0,arg3>>>0,arg4>>>0)};imports.wbg.__wbg_drawIndexed_81f88af371419343=function(arg0,arg1,arg2,arg3,arg4,arg5){getObject(arg0).drawIndexed(arg1>>>0,arg2>>>0,arg3>>>0,arg4,arg5>>>0)};imports.wbg.__wbg_drawIndexedIndirect_b3596671b7a78209=function(arg0,arg1,arg2){getObject(arg0).drawIndexedIndirect(getObject(arg1),arg2)};imports.wbg.__wbg_drawIndirect_199cc6179a3473bb=function(arg0,arg1,arg2){getObject(arg0).drawIndirect(getObject(arg1),arg2)};imports.wbg.__wbg_setIndexBuffer_df1ee79c2996ac2d=function(arg0,arg1,arg2,arg3){getObject(arg0).setIndexBuffer(getObject(arg1),takeObject(arg2),arg3)};imports.wbg.__wbg_setIndexBuffer_7795663d5f690377=function(arg0,arg1,arg2,arg3,arg4){getObject(arg0).setIndexBuffer(getObject(arg1),takeObject(arg2),arg3,arg4)};imports.wbg.__wbg_setPipeline_4c82624264826b5e=function(arg0,arg1){getObject(arg0).setPipeline(getObject(arg1))};imports.wbg.__wbg_setVertexBuffer_272d1391a3e6a158=function(arg0,arg1,arg2,arg3){getObject(arg0).setVertexBuffer(arg1>>>0,getObject(arg2),arg3)};imports.wbg.__wbg_setVertexBuffer_e71e7e02b8c77fcf=function(arg0,arg1,arg2,arg3,arg4){getObject(arg0).setVertexBuffer(arg1>>>0,getObject(arg2),arg3,arg4)};imports.wbg.__wbg_label_9a9e9fc564518aa6=function(arg0,arg1){const ret=getObject(arg1).label;const ptr0=passStringToWasm0(ret,wasm.__wbindgen_malloc,wasm.__wbindgen_realloc);const len0=WASM_VECTOR_LEN;getInt32Memory0()[arg0/4+1]=len0;getInt32Memory0()[arg0/4+0]=ptr0};imports.wbg.__wbg_beginComputePass_3a26c65b3bbaff3f=function(arg0,arg1){const ret=getObject(arg0).beginComputePass(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_beginRenderPass_db57aa384a7aef06=function(arg0,arg1){const ret=getObject(arg0).beginRenderPass(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_clearBuffer_9be070d52b051390=function(arg0,arg1,arg2){getObject(arg0).clearBuffer(getObject(arg1),arg2)};imports.wbg.__wbg_clearBuffer_9c36138099ac5c3b=function(arg0,arg1,arg2,arg3){getObject(arg0).clearBuffer(getObject(arg1),arg2,arg3)};imports.wbg.__wbg_copyBufferToBuffer_dfab33ec8c9e760e=function(arg0,arg1,arg2,arg3,arg4,arg5){getObject(arg0).copyBufferToBuffer(getObject(arg1),arg2,getObject(arg3),arg4,arg5)};imports.wbg.__wbg_copyBufferToTexture_5e32ab71e42ec4c2=function(arg0,arg1,arg2,arg3){getObject(arg0).copyBufferToTexture(getObject(arg1),getObject(arg2),getObject(arg3))};imports.wbg.__wbg_copyTextureToBuffer_c6674422a79a46ee=function(arg0,arg1,arg2,arg3){getObject(arg0).copyTextureToBuffer(getObject(arg1),getObject(arg2),getObject(arg3))};imports.wbg.__wbg_copyTextureToTexture_bc150c40fb6fd34f=function(arg0,arg1,arg2,arg3){getObject(arg0).copyTextureToTexture(getObject(arg1),getObject(arg2),getObject(arg3))};imports.wbg.__wbg_finish_72c07625138235ea=function(arg0){const ret=getObject(arg0).finish();return addHeapObject(ret)};imports.wbg.__wbg_finish_e43769cf456060ff=function(arg0,arg1){const ret=getObject(arg0).finish(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_resolveQuerySet_747a16df8fd5ab9b=function(arg0,arg1,arg2,arg3,arg4,arg5){getObject(arg0).resolveQuerySet(getObject(arg1),arg2>>>0,arg3>>>0,getObject(arg4),arg5>>>0)};imports.wbg.__wbg_writeTimestamp_99f90a307bb33e66=function(arg0,arg1,arg2){getObject(arg0).writeTimestamp(getObject(arg1),arg2>>>0)};imports.wbg.__wbg_dispatchWorkgroups_44644514248ca896=function(arg0,arg1,arg2,arg3){getObject(arg0).dispatchWorkgroups(arg1>>>0,arg2>>>0,arg3>>>0)};imports.wbg.__wbg_dispatchWorkgroupsIndirect_74f455cf53f849df=function(arg0,arg1,arg2){getObject(arg0).dispatchWorkgroupsIndirect(getObject(arg1),arg2)};imports.wbg.__wbg_end_4f73dcb320797ca5=function(arg0){getObject(arg0).end()};imports.wbg.__wbg_setPipeline_c1c3fde5d44173c8=function(arg0,arg1){getObject(arg0).setPipeline(getObject(arg1))};imports.wbg.__wbg_setBindGroup_534bbf726e58dd0d=function(arg0,arg1,arg2,arg3,arg4,arg5,arg6){getObject(arg0).setBindGroup(arg1>>>0,getObject(arg2),getArrayU32FromWasm0(arg3,arg4),arg5,arg6>>>0)};imports.wbg.__wbg_has_2b519b377040d29f=function(arg0,arg1,arg2){const ret=getObject(arg0).has(getStringFromWasm0(arg1,arg2));return ret};imports.wbg.__wbg_setwidth_5f2d364182f77a59=function(arg0,arg1){getObject(arg0).width=arg1>>>0};imports.wbg.__wbg_setheight_cc038dc5bacb3258=function(arg0,arg1){getObject(arg0).height=arg1>>>0};imports.wbg.__wbg_gpu_b519271f1eb946a2=function(arg0){const ret=getObject(arg0).gpu;return addHeapObject(ret)};imports.wbg.__wbg_navigator_be23dfd02508e02f=function(arg0){const ret=getObject(arg0).navigator;return addHeapObject(ret)};imports.wbg.__wbg_instanceof_GpuAdapter_6a21ec3028a6a633=function(arg0){let result;try{result=getObject(arg0)instanceof GPUAdapter}catch{result=false}const ret=result;return ret};imports.wbg.__wbg_features_03c1d8af712dca8d=function(arg0){const ret=getObject(arg0).features;return addHeapObject(ret)};imports.wbg.__wbg_limits_254f53e662b2a6f2=function(arg0){const ret=getObject(arg0).limits;return addHeapObject(ret)};imports.wbg.__wbg_requestDevice_98a881f5f37cbc1b=function(arg0,arg1){const ret=getObject(arg0).requestDevice(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_features_f50c54dfe05b4591=function(arg0){const ret=getObject(arg0).features;return addHeapObject(ret)};imports.wbg.__wbg_queue_6b0eedcf46d47cbd=function(arg0){const ret=getObject(arg0).queue;return addHeapObject(ret)};imports.wbg.__wbg_setonuncapturederror_52731b198f292e4e=function(arg0,arg1){getObject(arg0).onuncapturederror=getObject(arg1)};imports.wbg.__wbg_createBindGroup_2a20ed419eb0c234=function(arg0,arg1){const ret=getObject(arg0).createBindGroup(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_createBindGroupLayout_d8f7eb1e6a48042e=function(arg0,arg1){const ret=getObject(arg0).createBindGroupLayout(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_createBuffer_7c429b6a1c19d86f=function(arg0,arg1){const ret=getObject(arg0).createBuffer(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_createCommandEncoder_16ef0a1822a74575=function(arg0,arg1){const ret=getObject(arg0).createCommandEncoder(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_createComputePipeline_9d9c4c1e7c177a43=function(arg0,arg1){const ret=getObject(arg0).createComputePipeline(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_createPipelineLayout_651e444b8d7b374a=function(arg0,arg1){const ret=getObject(arg0).createPipelineLayout(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_createQuerySet_9af179dcd7eb51f9=function(arg0,arg1){const ret=getObject(arg0).createQuerySet(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_createRenderBundleEncoder_a3d9e81c72356ee7=function(arg0,arg1){const ret=getObject(arg0).createRenderBundleEncoder(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_createRenderPipeline_adf9ebf96b9eb9b4=function(arg0,arg1){const ret=getObject(arg0).createRenderPipeline(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_createSampler_3246c59a5aeec1ce=function(arg0,arg1){const ret=getObject(arg0).createSampler(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_createShaderModule_58ad41a3299a4bb9=function(arg0,arg1){const ret=getObject(arg0).createShaderModule(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_createTexture_ea9e43be4047490d=function(arg0,arg1){const ret=getObject(arg0).createTexture(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_popErrorScope_e2a2b1b7559dad18=function(arg0){const ret=getObject(arg0).popErrorScope();return addHeapObject(ret)};imports.wbg.__wbg_pushErrorScope_bf4bd73394fb8138=function(arg0,arg1){getObject(arg0).pushErrorScope(takeObject(arg1))};imports.wbg.__wbg_instanceof_GpuOutOfMemoryError_d620da37d8112b03=function(arg0){let result;try{result=getObject(arg0)instanceof GPUOutOfMemoryError}catch{result=false}const ret=result;return ret};imports.wbg.__wbg_instanceof_GpuValidationError_41d0ee6acd0ec286=function(arg0){let result;try{result=getObject(arg0)instanceof GPUValidationError}catch{result=false}const ret=result;return ret};imports.wbg.__wbg_get_8187c9b59091f3ad=function(arg0,arg1){const ret=getObject(arg0)[arg1>>>0];return isLikeNone(ret)?0:addHeapObject(ret)};imports.wbg.__wbg_debug_8db2eed1bf6c1e2a=function(arg0){console.debug(getObject(arg0))};imports.wbg.__wbg_error_fe807da27c4a4ced=function(arg0){console.error(getObject(arg0))};imports.wbg.__wbg_info_9e6db45ac337c3b5=function(arg0){console.info(getObject(arg0))};imports.wbg.__wbg_log_7bb108d119bafbc1=function(arg0){console.log(getObject(arg0))};imports.wbg.__wbg_warn_e57696dbb3977030=function(arg0){console.warn(getObject(arg0))};imports.wbg.__wbg_requestAdapter_1e9aee61dd467483=function(arg0,arg1){const ret=getObject(arg0).requestAdapter(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_new_b525de17f44a8943=function(){const ret=new Array;return addHeapObject(ret)};imports.wbg.__wbg_newnoargs_2b8b6bd7753c76ba=function(arg0,arg1){const ret=new Function(getStringFromWasm0(arg0,arg1));return addHeapObject(ret)};imports.wbg.__wbg_new_f841cc6f2098f4b5=function(){const ret=new Map;return addHeapObject(ret)};imports.wbg.__wbg_call_95d1ea488d03e4e8=function(){return handleError(function(arg0,arg1){const ret=getObject(arg0).call(getObject(arg1));return addHeapObject(ret)},arguments)};imports.wbg.__wbg_new_f9876326328f45ed=function(){const ret=new Object;return addHeapObject(ret)};imports.wbg.__wbg_self_e7c1f827057f6584=function(){return handleError(function(){const ret=self.self;return addHeapObject(ret)},arguments)};imports.wbg.__wbg_window_a09ec664e14b1b81=function(){return handleError(function(){const ret=window.window;return addHeapObject(ret)},arguments)};imports.wbg.__wbg_globalThis_87cbb8506fecf3a9=function(){return handleError(function(){const ret=globalThis.globalThis;return addHeapObject(ret)},arguments)};imports.wbg.__wbg_global_c85a9259e621f3db=function(){return handleError(function(){const ret=global.global;return addHeapObject(ret)},arguments)};imports.wbg.__wbg_set_17224bc548dd1d7b=function(arg0,arg1,arg2){getObject(arg0)[arg1>>>0]=takeObject(arg2)};imports.wbg.__wbg_push_49c286f04dd3bf59=function(arg0,arg1){const ret=getObject(arg0).push(getObject(arg1));return ret};imports.wbg.__wbg_call_9495de66fdbe016b=function(){return handleError(function(arg0,arg1,arg2){const ret=getObject(arg0).call(getObject(arg1),getObject(arg2));return addHeapObject(ret)},arguments)};imports.wbg.__wbg_set_388c4c6422704173=function(arg0,arg1,arg2){const ret=getObject(arg0).set(getObject(arg1),getObject(arg2));return addHeapObject(ret)};imports.wbg.__wbg_instanceof_Object_f5a826c4da0d4a94=function(arg0){let result;try{result=getObject(arg0)instanceof Object}catch{result=false}const ret=result;return ret};imports.wbg.__wbg_valueOf_1e54bbd68df19aa2=function(arg0){const ret=getObject(arg0).valueOf();return addHeapObject(ret)};imports.wbg.__wbg_new_9d3a9ce4282a18a8=function(arg0,arg1){try{var state0={a:arg0,b:arg1};var cb0=(arg02,arg12)=>{const a=state0.a;state0.a=0;try{return __wbg_adapter_332(a,state0.b,arg02,arg12)}finally{state0.a=a}};const ret=new Promise(cb0);return addHeapObject(ret)}finally{state0.a=state0.b=0}};imports.wbg.__wbg_resolve_fd40f858d9db1a04=function(arg0){const ret=Promise.resolve(getObject(arg0));return addHeapObject(ret)};imports.wbg.__wbg_then_ec5db6d509eb475f=function(arg0,arg1){const ret=getObject(arg0).then(getObject(arg1));return addHeapObject(ret)};imports.wbg.__wbg_then_f753623316e2873a=function(arg0,arg1,arg2){const ret=getObject(arg0).then(getObject(arg1),getObject(arg2));return addHeapObject(ret)};imports.wbg.__wbg_buffer_cf65c07de34b9a08=function(arg0){const ret=getObject(arg0).buffer;return addHeapObject(ret)};imports.wbg.__wbg_newwithbyteoffsetandlength_9fb2f11355ecadf5=function(arg0,arg1,arg2){const ret=new Uint8Array(getObject(arg0),arg1>>>0,arg2>>>0);return addHeapObject(ret)};imports.wbg.__wbg_new_537b7341ce90bb31=function(arg0){const ret=new Uint8Array(getObject(arg0));return addHeapObject(ret)};imports.wbg.__wbg_set_17499e8aa4003ebd=function(arg0,arg1,arg2){getObject(arg0).set(getObject(arg1),arg2>>>0)};imports.wbg.__wbg_length_27a2afe8ab42b09f=function(arg0){const ret=getObject(arg0).length;return ret};imports.wbg.__wbg_buffer_5f1fc856188c4b44=function(arg0){const ret=getObject(arg0).buffer;return addHeapObject(ret)};imports.wbg.__wbg_set_6aa458a4ebdb65cb=function(){return handleError(function(arg0,arg1,arg2){const ret=Reflect.set(getObject(arg0),getObject(arg1),getObject(arg2));return ret},arguments)};imports.wbg.__wbindgen_debug_string=function(arg0,arg1){const ret=debugString(getObject(arg1));const ptr0=passStringToWasm0(ret,wasm.__wbindgen_malloc,wasm.__wbindgen_realloc);const len0=WASM_VECTOR_LEN;getInt32Memory0()[arg0/4+1]=len0;getInt32Memory0()[arg0/4+0]=ptr0};imports.wbg.__wbindgen_throw=function(arg0,arg1){throw new Error(getStringFromWasm0(arg0,arg1))};imports.wbg.__wbindgen_memory=function(){const ret=wasm.memory;return addHeapObject(ret)};imports.wbg.__wbindgen_closure_wrapper1231=function(arg0,arg1,arg2){const ret=makeMutClosure(arg0,arg1,411,__wbg_adapter_30);return addHeapObject(ret)};imports.wbg.__wbindgen_closure_wrapper1233=function(arg0,arg1,arg2){const ret=makeMutClosure(arg0,arg1,411,__wbg_adapter_30);return addHeapObject(ret)};imports.wbg.__wbindgen_closure_wrapper3785=function(arg0,arg1,arg2){const ret=makeMutClosure(arg0,arg1,881,__wbg_adapter_35);return addHeapObject(ret)};return imports}function initMemory(imports,maybe_memory){}function finalizeInit(instance,module){wasm=instance.exports;init.__wbindgen_wasm_module=module;cachedFloat32Memory0=null;cachedInt32Memory0=null;cachedUint32Memory0=null;cachedUint8Memory0=null;wasm.__wbindgen_start();return wasm}async function init(input){if(typeof input==="undefined"){input=new URL("wonnx_bg.wasm",import.meta.url)}const imports=getImports();if(typeof input==="string"||typeof Request==="function"&&input instanceof Request||typeof URL==="function"&&input instanceof URL){input=fetch(input)}initMemory(imports);const{instance,module}=await load(await input,imports);return finalizeInit(instance,module)}var wonnx_default=init;var D=(i=()=>{})=>{globalThis.WORKER={};let R=(r,n,l,f)=>{if(globalThis.WORKER.SENDERS&&f!==true)if(f!==void 0&&f!=="both")globalThis.WORKER.SENDERS[f]&&(r?.message?globalThis.WORKER.SENDERS[f].postMessage({message:r.message,overridePort:r?.overridePort},r.transfer):globalThis.WORKER.SENDERS[f].postMessage({message:r,overridePort:r?.overridePort}));else{for(let p in globalThis.WORKER.SENDERS){if(globalThis.WORKER.BLOCKING[p]){if(globalThis.WORKER.BLOCKED[p]){console.error("Thread Blocked: "+p);continue}globalThis.WORKER.BLOCKED[p]=true}r?.message?globalThis.WORKER.SENDERS[p].postMessage({message:r.message,overridePort:r?.overridePort},r.transfer):globalThis.WORKER.SENDERS[p].postMessage({message:r,overridePort:r?.overridePort})}l&&postMessage(true)}(!globalThis.WORKER.SENDERS||f===true||f==="both")&&(r?.message?postMessage({message:r.message,cb:n,overridePort:r?.overridePort},r.transfer):postMessage({message:r,cb:n,overridePort:r?.overridePort}))},g=(r,n)=>{let l=i(r.data?.message);l?.then?l.then(f=>{n&&n.postMessage(true),R(f,r.data.cb,r.data.oneOff,r.data.overridePort)}):(n&&n.postMessage(true),R(l,r.data.cb,r.data.oneOff,r.data.overridePort))};globalThis.onmessage=r=>{if(r.data?.COMMAND){let n=r.data.COMMAND;if(typeof n.SETLOOP=="number"){globalThis.WORKER.LOOP&&clearTimeout(globalThis.WORKER.LOOP);let l=()=>{g(r),globalThis.WORKER.LOOP=setTimeout(()=>{l()},n.SETLOOP)};l()}if(n.SETANIM){globalThis.WORKER.ANIM&&cancelAnimationFrame(globalThis.WORKER.ANIM);let l=()=>{g(r),globalThis.WORKER.ANIM=requestAnimationFrame(()=>{l()})};l()}if(n.STOP&&(globalThis.WORKER.LOOP&&clearTimeout(globalThis.WORKER.LOOP),globalThis.WORKER.ANIM&&cancelAnimationFrame(globalThis.WORKER.ANIM)),n.RECEIVER){let l=n.blocking;globalThis.WORKER.RECEIVERS||(globalThis.WORKER.RTCR=0,globalThis.WORKER.RECEIVERS={});let f=n.id;globalThis.WORKER.RECEIVERS[f]=n.RECEIVER,globalThis.WORKER.RTCR++,n.RECEIVER.onmessage=p=>{g(p,l?n.RECEIVER:void 0)},n.RECEIVER.onerror=p=>{delete globalThis.WORKER.RECEIVERS[f]}}if(n.SENDER){globalThis.WORKER.SENDERS||(globalThis.WORKER.PCTR=0,globalThis.WORKER.SENDERS={},globalThis.WORKER.BLOCKING={},globalThis.WORKER.BLOCKED={});let l=n.blocking,f=n.id?n.id:globalThis.WORKER.PCTR;globalThis.WORKER.SENDERS[f]=n.SENDER,globalThis.WORKER.PCTR++,l&&(globalThis.WORKER.BLOCKING[f]=true),n.SENDER.onmessage=p=>{globalThis.WORKER.BLOCKING[f]&&(globalThis.WORKER.BLOCKED[f]=false)},n.SENDER.onerror=p=>{delete globalThis.WORKER.SENDERS[f]}}n.DELETED&&(delete globalThis.WORKER.RECEIVERS?.[n.DELETED],delete globalThis.WORKER.SENDERS?.[n.DELETED])}else g(r)},globalThis.onerror=r=>{console.error(r)}};var L=D.toString();if(globalThis instanceof WorkerGlobalScope){let convertRGBAtoRGBFloat32=function(rgbaData){if(rgbaData.length%4!==0){throw new Error("Input array length must be a multiple of 4")}const numPixels=rgbaData.length/4;const rgbData=new Float32Array(numPixels*3);for(let i=0;i<numPixels;i++){const rgbaIndex=i*4;const rgbIndex=i*3;rgbData[rgbIndex]=rgbaData[rgbaIndex]/255;rgbData[rgbIndex+1]=rgbaData[rgbaIndex+1]/255;rgbData[rgbIndex+2]=rgbaData[rgbaIndex+2]/255}return rgbData};const range=(start,stop,step=1)=>Array(Math.ceil((stop-start)/step)).fill(start).map((x,y)=>x+y*step);let modelName="inception-mnist.onnx";let labelsName="mnist-labels.txt";let inputName="input";let outputName="output";let outputWidth=224;let outputHeight=224;let inferenceCount=0;let inferenceTime=0;const planes=3;const valuesPerPixel=4;let mean=[.485,.456,.406];let std=[.229,.224,.225];const initClassifier=async()=>{let session,labelsList;async function classifyImage(data){if(data.command==="configure"){if(data.modelName)modelName=data.modelName;if(data.labelsName)labelsName=data.labelsName;if(data.outputName)outputName=data.outputName;if(data.inputName)inputName=data.inputName;if(data.outputWidth)outputWidth=data.outputWidth;if(data.outputHeight)outputHeight=data.outputHeight;async function fetchBytes(url){const reply=await fetch(url);const blob=await reply.arrayBuffer();const arr=new Uint8Array(blob);return arr}const[modelBytes,initResult,labelsResult]=await Promise.all([fetchBytes(location.origin+"/models/"+modelName),wonnx_default(),fetch(location.origin+"/models/"+labelsName).then(r=>r.text())]);console.log("Initialized",{modelBytes,initResult,Session,labelsResult});session=await Session.fromBytes(modelBytes);labelsList=labelsResult.split(/\n/g);return}if(!data)return;const imageData=new ImageData(data.image,data.width,data.height);const imageTransformed=convertRGBAtoRGBFloat32(imageData.data);const input=new Input;input.insert(inputName,imageTransformed);const start=performance.now();const result=await session.run(input);const duration=performance.now()-start;inferenceCount++;inferenceTime+=duration;input.free();const probs=result.get(outputName);let maxProb=-1;let maxIndex=-1;for(let index=0;index<probs.length;index++){const p=probs[index];if(p>maxProb){maxProb=p;maxIndex=index}}const avgFrameTime=inferenceTime/inferenceCount;const avgFrameRate=inferenceCount/(inferenceTime*.001);return{probs,maxProb,label:labelsList[maxIndex],inferenceTime:duration,avgFrameTime,avgFrameRate,name:data.name,width:data.width,height:data.height}}D(classifyImage)};initClassifier()}var wonnx_thread_default=self;export{wonnx_thread_default as default};
