<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <span class="navbar-brand mb-0 h1">{{ name }}</span>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" :href="docs">Docs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :href="gitee">Gitee</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :href="github">Github</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :href="npm">Npm</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :href="download">download</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :href="homepage">Author Home page</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="jumbotron">
            <div class="container">
                <h1 class="display-3" style="margin-bottom: 20px">
                    {{ name }}
                    <span class="badge badge-light">{{ version }}</span>
                </h1>
                <p>
                    <a href="https://github.com/acccccccb/vue-img-cutter/stargazers">
                        <img
                            alt="GitHub stars"
                            src="https://img.shields.io/github/stars/acccccccb/vue-img-cutter?style=for-the-badge"
                        />
                    </a>
                    <a href="https://github.com/acccccccb/vue-img-cutter/network">
                        <img
                            alt="GitHub forks"
                            src="https://img.shields.io/github/forks/acccccccb/vue-img-cutter?style=for-the-badge"
                        />
                    </a>
                    <a href="https://www.npmjs.com/package/vue-img-cutter">
                        <img alt="npm" src="https://img.shields.io/npm/v/vue-img-cutter?style=for-the-badge" />
                    </a>
                    <a href="https://www.npmjs.com/package/vue-img-cutter">
                        <img alt="npm" src="https://img.shields.io/npm/dt/vue-img-cutter?style=for-the-badge" />
                    </a>
                </p>
                <p>{{ description }}</p>
                <p>
                    <a class="btn btn-success btn-lg" :href="download" target="_blank" role="button"
                        ><i class="fa fa-download"></i> Download</a
                    >
                    <a class="btn btn-light btn-lg" :href="github" target="_blank" role="button"
                        ><i class="fa fa-link"></i> Github</a
                    >
                    <a
                        class="btn btn-link"
                        style="color: #fff; text-decoration: underline"
                        :href="gitee"
                        target="_blank"
                        role="button"
                        >Gitee</a
                    >
                </p>
            </div>
            <svg
                class="waves"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shape-rendering="auto"
            >
                <defs>
                    <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
            </svg>
        </div>
        <div class="row bg" style="padding-top: 0">
            <div class="col-md-10 offset-md-1">
                <h1 class="bd-title">
                    <i class="fa fa-plane"></i> Easy to use
                    <small class="text-muted">Increase of efficiency</small>
                </h1>
                <p class="lead">You can use it in a few simple steps</p>
                <div class="alert alert-light" style="margin-top: 40px">
                    <code class="language-html">
                        <pre>
1.Install:
    npm i vue-img-cutter@2 -S # For vue2
    npm i vue-img-cutter@3 -S # For vue3
                        </pre>
                    </code>
                    <code class="language-html">
                        <pre>2.Import: import ImgCutter from 'vue-img-cutter';</pre>
                    </code>
                    <code class="language-html">
                        <pre>3.Register components: components: { ImgCutter }</pre>
                    </code>
                    <code class="language-html">
                        <pre>4.Code: &lt;ImgCutter @cutDown="cutDown"&gt;&lt;/ImgCutter&gt;</pre>
                    </code>
                    <code class="language-html">
                        <pre class="mb-0">5.Return: cutDown:function(res){ ...Do something }</pre>
                    </code>
                </div>
            </div>
        </div>
        <div class="row bg grayBg" style="padding-bottom: 60px">
            <div class="col-md-10 offset-md-1">
                <h1 class="bd-title">
                    <i class="fa fa-cog"></i> Online configuration
                    <small class="text-muted">Preview and generate code</small>
                </h1>
                <p class="lead">Use this tool to preview and generate code。</p>
                <div class="row" style="margin-top: 40px">
                    <div class="col-md-6" ref="imgCutterBox" style="height: 458px; overflow: hidden">
                        <div
                            v-if="params.isModal"
                            style="
                                width: 100%;
                                height: 458px;
                                background: #dedede;
                                box-sizing: border-box;
                                border: 1px solid #dedede;
                            "
                        >
                            <div style="width: 50%; margin: 180px auto auto auto">
                                <div class="btn btn-primary btn-block" @click="pluginExe('handleOpen')">
                                    {{ params.label }}
                                </div>
                                <div class="btn btn-secondary btn-block" @click="forIe9">
                                    Crop remote pictures（For IE9+）
                                </div>
                            </div>
                        </div>
                        <ImgCutter
                            v-if="refresh"
                            ref="imgCutterModal"
                            :crossOrigin="params.crossOrigin"
                            :label="params.label"
                            :rate="params.rate"
                            :index="params.index"
                            :isModal="params.isModal"
                            :showChooseBtn="params.showChooseBtn"
                            :lockScroll="params.lockScroll"
                            :boxWidth="params.boxWidth"
                            :boxHeight="params.boxHeight"
                            :cutWidth="params.cutWidth"
                            :cutHeight="params.cutHeight"
                            :sizeChange="params.sizeChange"
                            :moveAble="params.moveAble"
                            :imgMove="params.imgMove"
                            :tool="params.tool"
                            :fileType="params.fileType"
                            :originalGraph="params.originalGraph"
                            :previewMode="params.previewMode"
                            :toolBoxOverflow="params.toolBoxOverflow"
                            :WatermarkText="params.WatermarkText"
                            :WatermarkTextFont="params.WatermarkTextFont"
                            :WatermarkTextColor="params.WatermarkTextColor"
                            :WatermarkTextX="params.WatermarkTextX"
                            :WatermarkTextY="params.WatermarkTextY"
                            :smallToUpload="params.smallToUpload"
                            :saveCutPosition="params.saveCutPosition"
                            :scaleAble="params.scaleAble"
                            :DoNotDisplayCopyright="false"
                            toolBgc="params.toolBgc"
                            @onChooseImg="onChooseImg"
                            @onClearAll="onClearAll"
                            @onPrintImg="onPrintImg"
                            @error="catchError"
                            @cutDown="cutDown"
                        >
                            <template #open></template>
                            <template #choose v-if="params.isModal == false"> </template>
                            <template #cancel v-if="params.isModal == false"> </template>
                            <template #confirm v-if="params.isModal == false"> </template>
                        </ImgCutter>
                    </div>
                    <div class="col-md-3">
                        <div class="imgCutDownBox" :style="'height:458px;'">
                            <div class="imgCutDownBoxContainer">
                                <img :src="imgSrc" v-if="!!imgSrc" alt="" />
                                <span v-else class="imgCutDownTips">Cut it out and show it here</span>
                            </div>

                            <div class="text-center">
                                <a
                                    :class="'btn btn-light' + (imgSrc ? '' : ' disabled')"
                                    :disabled="!imgSrc"
                                    :href="imgSrc"
                                    :download="downloadName || 'image.jpg'"
                                    role="button"
                                    >Download</a
                                >
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <form>
                            <div class="form-group">
                                <label for="cutImgSrc"> Remote pictures src：</label>
                                <input
                                    type="text"
                                    name="cutImgSrc"
                                    class="form-control"
                                    @input="catchInput($event)"
                                    :value="cutImgSrc"
                                    placeholder="Remote pictures src"
                                />
                            </div>
                            <div class="form-group">
                                <div
                                    class="btn btn-primary btn-block"
                                    v-if="params.isModal === false"
                                    @click="pluginExe('chooseImg')"
                                >
                                    {{ params.label }}
                                </div>
                                <div
                                    class="btn btn-primary btn-block"
                                    v-if="params.isModal === true"
                                    @click="pluginExe('handleOpen')"
                                >
                                    {{ params.label }}
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="btn btn-secondary btn-block" @click="forIe9">
                                    Crop remote pictures（For IE9+）
                                </div>
                            </div>
                            <div class="form-group">
                                <button
                                    type="button"
                                    :disabled="params.isModal === true || loadImg === false"
                                    class="btn btn-success btn-block"
                                    @click="pluginExe('cropPicture')"
                                >
                                    Confirm
                                </button>
                            </div>
                            <div class="form-group">
                                <button
                                    type="button"
                                    class="btn btn-light btn-block"
                                    :disabled="params.isModal === true"
                                    @click="pluginExe('clearAll')"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-10 offset-md-1" style="margin-top: 20px">
                <div class="card">
                    <div class="card-header">Config tool</div>
                    <div class="card-body">
                        <form autocomplete="off">
                            <div class="row">
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="label">Button text（label）：</label>
                                        <input
                                            @input="setData($event)"
                                            name="label"
                                            type="text"
                                            class="form-control"
                                            v-model="params.label"
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="boxWidth">Tool width（boxWidth）：</label>
                                        <input
                                            @input="setData($event)"
                                            :readonly="params.isModal == false"
                                            name="boxWidth"
                                            type="text"
                                            class="form-control"
                                            v-model="params.boxWidth"
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="boxHeight">Tool height（boxHeight）：</label>
                                        <input
                                            @input="setData($event)"
                                            :readonly="params.isModal == false"
                                            name="boxHeight"
                                            type="text"
                                            class="form-control"
                                            v-model="params.boxHeight"
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="cutWidth">Selection box width（cutWidth）：</label>
                                        <input
                                            @input="setData($event)"
                                            name="cutWidth"
                                            type="text"
                                            class="form-control"
                                            v-model="params.cutWidth"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="cutHeight">Selection box height（cutHeight）：</label>
                                        <input
                                            @input="setData($event)"
                                            name="cutHeight"
                                            type="text"
                                            class="form-control"
                                            v-model="params.cutHeight"
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="rate">Length-width ratio（rate）：</label>
                                        <input
                                            @input="setData($event)"
                                            name="rate"
                                            type="text"
                                            class="form-control"
                                            placeholder="eg：1:1"
                                            v-model="params.rate"
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="toolBgc">Toolbar background color（toolBgc）：</label>
                                        <input
                                            @input="setData($event)"
                                            name="toolBgc"
                                            type="text"
                                            class="form-control"
                                            v-model="params.toolBgc"
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="crossOriginHeader"
                                            >Cross origin header（crossOriginHeader）：</label
                                        >
                                        <input
                                            @input="setData($event)"
                                            name="crossOriginHeader"
                                            type="text"
                                            class="form-control"
                                            v-model="params.crossOriginHeader"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="crossOrigin">Is cross origin（crossOrigin）：</label>
                                        <select @change="setData($event)" name="crossOrigin" class="custom-select">
                                            <option value="true" selected>YES</option>
                                            <option value="false">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="isModal">Is modal（isModal）：</label>
                                        <select @change="setData($event)" name="isModal" class="custom-select">
                                            <option value="true">YES</option>
                                            <option value="false" selected>NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="showChooseBtn">Show select button（showChooseBtn）：</label>
                                        <select @change="setData($event)" name="showChooseBtn" class="custom-select">
                                            <option value="true" selected>YES</option>
                                            <option value="false">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="lockScroll">Lock scroll（lockScroll）：</label>
                                        <select @change="setData($event)" name="lockScroll" class="custom-select">
                                            <option value="true" selected>YES</option>
                                            <option value="false">NO</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="sizeChange">Allow to change size（sizeChange）：</label>
                                        <select @change="setData($event)" name="sizeChange" class="custom-select">
                                            <option value="true" selected>YES</option>
                                            <option value="false">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="moveAble">Allow to move（moveAble）：</label>
                                        <select @change="setData($event)" name="moveAble" class="custom-select">
                                            <option value="true" selected>YES</option>
                                            <option value="false">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="tool">Show toolbar（tool）：</label>
                                        <select @change="setData($event)" name="tool" class="custom-select">
                                            <option value="true" selected>YES</option>
                                            <option value="false">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="originalGraph">Crop original image（originalGraph）：</label>
                                        <select @change="setData($event)" name="originalGraph" class="custom-select">
                                            <option value="true">YES</option>
                                            <option value="false" selected>NO</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="saveCutPosition">saveCutPosition（ Save cut position ）：</label>
                                        <select @change="setData($event)" name="saveCutPosition" class="custom-select">
                                            <option value="true" selected>YES</option>
                                            <option value="false">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="scaleAble">scaleAble（ Allow scale image ）：</label>
                                        <select @change="setData($event)" name="scaleAble" class="custom-select">
                                            <option value="true" selected>YES</option>
                                            <option value="false">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="imgMove">imgMove（ Allow move image ）：</label>
                                        <select @change="setData($event)" name="imgMove" class="custom-select">
                                            <option value="true" selected>YES</option>
                                            <option value="false">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="fileType">fileType（ Return file type ）：</label>
                                        <input
                                            @input="setData($event)"
                                            name="fileType"
                                            type="text"
                                            class="form-control"
                                            v-model="params.fileType"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="index">index（Return result with index）：</label>
                                        <input
                                            @input="setData($event)"
                                            name="index"
                                            type="text"
                                            class="form-control"
                                            v-model="params.index"
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="smallToUpload"
                                            >smallToUpload（If choose image size less then defined Size,return file.
                                            sizeChange must be false ）：</label
                                        >
                                        <select @change="setData($event)" name="smallToUpload" class="custom-select">
                                            <option value="true">YES</option>
                                            <option value="false" selected>NO</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="toolBoxOverflow">
                                            toolBoxOverflow（Allow tool box out of picture range）：
                                        </label>
                                        <select @change="setData($event)" name="toolBoxOverflow" class="custom-select">
                                            <option value="true" selected>YES</option>
                                            <option value="false">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="previewMode">previewMode（Return results at any time）：</label>
                                        <select @change="setData($event)" name="previewMode" class="custom-select">
                                            <option value="true" selected>YES</option>
                                            <option value="false">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="WatermarkText">Watermark（WatermarkText）：</label>
                                        <input
                                            @input="setData($event)"
                                            name="WatermarkText"
                                            type="text"
                                            class="form-control"
                                            v-model="params.WatermarkText"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="WatermarkTextFont">Font size（WatermarkTextFont）：</label>
                                        <input
                                            @input="setData($event)"
                                            name="WatermarkTextFont"
                                            type="text"
                                            class="form-control"
                                            v-model="params.WatermarkTextFont"
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="WatermarkTextColor">Font color（WatermarkTextColor）：</label>
                                        <input
                                            @input="setData($event)"
                                            name="WatermarkTextColor"
                                            type="text"
                                            class="form-control"
                                            v-model="params.WatermarkTextColor"
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="WatermarkTextX">Position x（WatermarkTextX）：</label>
                                        <input
                                            @input="setData($event)"
                                            name="WatermarkTextX"
                                            type="text"
                                            class="form-control"
                                            v-model="params.WatermarkTextX"
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group custom-control">
                                        <label for="WatermarkTextY">Position y（WatermarkTextY）：</label>
                                        <input
                                            @input="setData($event)"
                                            name="WatermarkTextY"
                                            type="text"
                                            class="form-control"
                                            v-model="params.WatermarkTextY"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row" style="margin-top: 20px">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">HTML</div>
                            <div class="card-body">
                                <pre>
                <code>{{code1}}</code>
              </pre>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">Javascript</div>
                            <div class="card-body" style="height: 623px">
                                <pre>
                <code>{{code2}}</code>
              </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row bg">
            <div class="col-md-10 offset-md-1">
                <h1 class="bd-title">
                    <i class="fa fa-magic"></i> Donation
                    <small class="text-muted">Donate in support of the author</small>
                </h1>
                <p class="lead">Can you buy me a cup of coffee :)</p>
            </div>
            <div class="col-md-10 offset-md-1" style="margin-top: 20px">
                <div class="alipay">
                    <div>
                        <img src="https://ihtmlcss.oss-cn-chengdu.aliyuncs.com/2020/01/weixinpay.png" alt="捐赠" />
                    </div>
                    <div class="text-center">微信 Wechat</div>
                </div>
                <div class="alipay">
                    <div>
                        <img src="https://ihtmlcss.oss-cn-chengdu.aliyuncs.com/2020/01/alipay.png" alt="捐赠" />
                    </div>
                    <div class="text-center">支付宝 Alipay</div>
                </div>
            </div>
        </div>
        <div class="row bg grayBg" style="padding-bottom: 20px; margin-top: 50px">
            <div class="col">
                <blockquote class="blockquote text-center">
                    <p class="mb-0">
                        {{ name }} {{ version }}
                        <a :href="github" class="font-weight-lighter">Github</a>
                        <a :href="gitee" class="font-weight-lighter">Gitee</a>
                        <a :href="npm" class="font-weight-lighter">Npm</a>
                    </p>
                    <footer>
                        <small>
                            <a :href="homepage" class="font-weight-lighter">Author Home page</a>
                        </small>
                    </footer>
                </blockquote>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../package.json';
    import ImgCutter from './components/ImgCutter.vue';

    export default {
        name: 'App',
        components: {
            ImgCutter,
        },
        data() {
            return {
                name: '',
                version: '',
                author: '',
                description: '',
                banner: 'https://i.picsum.photos/id/743/1920/500.jpg',
                github: 'https://github.com/acccccccb/vue-img-cutter',
                gitee: 'https://gitee.com/GLUESTICK/vue-img-cutter',
                download: 'https://github.com/acccccccb/vue-img-cutter/archive/master.zip',
                cutImgSrc: 'https://phpcrm-oss.oss-cn-chengdu.aliyuncs.com/weixinpay.png',
                homepage: 'https://www.ihtmlcss.com',
                docs: 'https://github.com/acccccccb/vue-img-cutter/blob/master/README.md',
                npm: 'https://www.npmjs.com/package/vue-img-cutter',
                cutImgWidth: 250,
                cutImgHeight: 250,
                imgSrc: null,
                downloadName: '',
                refresh: true,
                isForIe9: false,
                loadImg: false,
                onPrintImgTimmer: null,
                params: {
                    label: 'Crop local pictures',
                    fileType: 'jpeg',
                    crossOrigin: true,
                    crossOriginHeader: '*',
                    rate: '',
                    toolBgc: 'none',
                    isModal: false,
                    showChooseBtn: true,
                    saveCutPosition: true,
                    scaleAble: true,
                    lockScroll: true,
                    toolBoxOverflow: true,
                    boxWidth: 500,
                    boxHeight: 458,
                    cutWidth: 250,
                    cutHeight: 250,
                    sizeChange: true,
                    moveAble: true,
                    imgMove: true,
                    tool: true,
                    originalGraph: false,
                    WatermarkText: 'vue-img-cutter',
                    WatermarkTextFont: '12px Sans-serif',
                    WatermarkTextColor: '#00ff00',
                    WatermarkTextX: 0.95,
                    WatermarkTextY: 0.95,
                    smallToUpload: true,
                    previewMode: true,
                    index: '',
                },
                code1: '',
                code2:
                    '\n' +
                    '// Crop remote pictures（For IE9）\n' +
                    'forIe9:function(){\n' +
                    '   this.$refs.imgCutterModal.handleOpen({\n' +
                    '       name:1.png,\n' +
                    '       src:http://imgurl.com/1.png,\n' +
                    '   });\n' +
                    '}',
            };
        },
        created() {
            this.name = config.name;
            this.version = config.version;
            this.author = config.author;
            this.description = config.description;
        },
        mounted() {
            let $imgCutterBox = this.$refs.imgCutterBox;
            this.params.boxWidth = $imgCutterBox.offsetWidth - 30;
            this.createCode();
            //    this.forIe9();
        },
        methods: {
            cutDown: function (res) {
                console.log('cutDown');
                console.log(res);
                this.imgSrc = res.dataURL;
                this.downloadName = res.fileName;
            },
            forIe9: function () {
                this.$refs.imgCutterModal.handleOpen({
                    name: this.cutImgSrc,
                    src: this.cutImgSrc,
                    // width: this.cutImgWidth,
                    // height: this.cutImgHeight,
                });
            },
            doRefresh: function () {
                this.refresh = false;
                this.$nextTick(() => {
                    this.refresh = true;
                });
            },
            onClearAll: function () {
                // 清空事件
                this.loadImg = false;
                this.imgSrc = '';
            },
            onPrintImg: function (res) {
                // 预览图片
                this.imgSrc = res.dataURL;
            },
            onChooseImg: function (res) {
                // 选择图片事件
                if (res) {
                    this.loadImg = true;
                }
            },
            createCode: function () {
                this.code1 =
                    '\n' +
                    '<ImgCutter\n' +
                    '   ref="imgCutterModal"\n' +
                    '   label="' +
                    this.params.label +
                    '"\n' +
                    '   fileType="' +
                    this.params.fileType +
                    '"\n' +
                    '   :crossOrigin="' +
                    this.params.crossOrigin +
                    '"\n' +
                    '   crossOriginHeader="' +
                    this.params.crossOriginHeader +
                    '"\n' +
                    '   rate="' +
                    this.params.rate +
                    '"\n' +
                    '   toolBgc="' +
                    this.params.toolBgc +
                    '"\n' +
                    '   :isModal="' +
                    this.params.isModal +
                    '"\n' +
                    '   :showChooseBtn="' +
                    this.params.showChooseBtn +
                    '"\n' +
                    '   :lockScroll="' +
                    this.params.lockScroll +
                    '"\n' +
                    '   :boxWidth="' +
                    this.params.boxWidth +
                    '"\n' +
                    '   :boxHeight="' +
                    this.params.boxHeight +
                    '"\n' +
                    '   :cutWidth="' +
                    this.params.cutWidth +
                    '"\n' +
                    '   :cutHeight="' +
                    this.params.cutHeight +
                    '"\n' +
                    '   :sizeChange="' +
                    this.params.sizeChange +
                    '"\n' +
                    '   :moveAble="' +
                    this.params.moveAble +
                    '"\n' +
                    '   :imgMove="' +
                    this.params.imgMove +
                    '"\n' +
                    '   :originalGraph="' +
                    this.params.originalGraph +
                    '"\n' +
                    '   WatermarkText="' +
                    this.params.WatermarkText +
                    '"\n' +
                    '   WatermarkTextFont="' +
                    this.params.WatermarkTextFont +
                    '"\n' +
                    '   WatermarkTextColor="' +
                    this.params.WatermarkTextColor +
                    '"\n' +
                    '   :WatermarkTextX="' +
                    this.params.WatermarkTextX +
                    '"\n' +
                    '   :WatermarkTextY="' +
                    this.params.WatermarkTextY +
                    '"\n' +
                    '   :smallToUpload="' +
                    this.params.smallToUpload +
                    '"\n' +
                    '   :saveCutPosition="' +
                    this.params.saveCutPosition +
                    '"\n' +
                    '   :scaleAble="' +
                    this.params.scaleAble +
                    '"\n' +
                    '   :previewMode="' +
                    this.params.previewMode +
                    '"\n' +
                    '   :toolBoxOverflow="' +
                    this.params.toolBoxOverflow +
                    '"\n' +
                    '   :index="' +
                    this.params.index +
                    '"\n' +
                    '   @cutDown="cutDown">\n' +
                    '       <div class="btn btn-primary" #open>' +
                    this.params.label +
                    '</div>\n' +
                    '</ImgCutter>';
            },
            setData: function ($event) {
                function isNumber(val) {
                    let regPos = /^\d+(\.\d+)?$/; //非负浮点数
                    let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
                    if (regPos.test(val) || regNeg.test(val)) {
                        return true;
                    } else {
                        return false;
                    }
                }

                let value = $event.target.value;
                if (value == 'true') {
                    value = true;
                }
                if (value == 'false') {
                    value = false;
                }
                if (isNumber(value) === true) {
                    value = parseInt(value);
                }
                this.params[$event.target.name] = value;
                this.doRefresh();
                this.createCode();
            },
            catchInput(e) {
                let val = e.target.value;
                let key = e.target.name;
                this[key] = val;
            },
            catchError(res) {
                console.log(res);
                window.alert(res.msg);
            },
            pluginExe: function (functionName) {
                this.$refs.imgCutterModal[functionName]();
            },
        },
    };
</script>
<style scoped>
    .bg {
        padding-top: 50px;
    }

    .grayBg {
        background: #f1f5f7;
    }

    .imgCutDownBox {
        width: 100%;
        background: #dedede;
        box-sizing: border-box;
        border: 1px solid #dedede;
    }

    .imgCutDownBoxContainer {
        width: 90%;
        height: 360px;
        overflow: hidden;
        margin: 20px auto;
        border: 1px solid #ccc;
        background: #fff;
        text-align: center;
    }

    .imgCutDownBoxContainer img {
        max-width: 100%;
        max-height: 100%;
        margin-top: 50%;
        transform: translateY(-50%);
    }

    .imgCutDownTips {
        font-size: 0.8em;
        line-height: 360px;
        color: #c0c4cc;
    }

    .alipay {
        width: 200px;
        padding: 10px;
        border-radius: 3px;
        border: 1px solid #333;
        display: inline-block;
        margin-right: 30px;
    }

    .alipay img {
        width: 100%;
    }

    .jumbotron {
        border-radius: 0;
        background: linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%) !important;
        padding: 4rem 0 0 0;
        color: #fff;
        text-align: center;
    }

    svg {
        shape-rendering: auto;
        width: 100%;
        height: 100px;
    }

    svg:not(:root) {
        overflow: hidden;
    }

    /* Animation */

    .parallax > use {
        animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
    }

    .parallax > use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
    }

    .parallax > use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 10s;
    }

    .parallax > use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 13s;
    }

    .parallax > use:nth-child(4) {
        animation-delay: -5s;
        animation-duration: 20s;
    }

    @keyframes move-forever {
        0% {
            transform: translate3d(-90px, 0, 0);
        }
        100% {
            transform: translate3d(85px, 0, 0);
        }
    }
</style>
