<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <span class="navbar-brand mb-0 h1">{{ name }} {{ version }}</span>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a
              class="nav-link"
              :href="docs"
            >{{ $t('introduce.docs') }}</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :href="gitee"
            >{{ $t('introduce.gitee') }}</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :href="github"
            >{{ $t('introduce.github') }}</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :href="npm"
            >{{ $t('introduce.npm') }}</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :href="download"
            >{{ $t('introduce.download') }}</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :href="homepage"
            >{{ $t('introduce.homepage') }}</a>
          </li>
          <li class="nav-item dropdown">
            <a
              id="navbarScrollingDropdown2"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              语言(Language)
            </a>
            <ul
              class="dropdown-menu"
              aria-labelledby="navbarScrollingDropdown2"
            >
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click="changeLocale('zh-CN')"
                >中文</a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click="changeLocale('en-US')"
                >English</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    <div class="jumbotron">
      <div class="container">
        <h1
          class="display-3"
          style="margin-bottom: 20px"
        >
          {{ name }}
          <span class="badge badge-light">{{ version }}</span>
        </h1>
        <p style="display: flex; justify-content: center">
          <a
            href="https://github.com/acccccccb/vue-img-cutter/stargazers"
            style="margin: 0 5px"
          >
            <img
              alt="GitHub stars"
              src="https://img.shields.io/github/stars/acccccccb/vue-img-cutter?style=for-the-badge"
            >
          </a>
          <a
            href="https://github.com/acccccccb/vue-img-cutter/network"
            style="margin: 0 5px"
          >
            <img
              alt="GitHub forks"
              src="https://img.shields.io/github/forks/acccccccb/vue-img-cutter?style=for-the-badge"
            >
          </a>
          <a
            href="https://www.npmjs.com/package/vue-img-cutter"
            style="margin: 0 5px"
          >
            <img
              alt="npm"
              src="https://img.shields.io/npm/v/vue-img-cutter?style=for-the-badge"
            >
          </a>
          <a
            href="https://www.npmjs.com/package/vue-img-cutter"
            style="margin: 0 5px"
          >
            <img
              alt="npm"
              src="https://img.shields.io/npm/dt/vue-img-cutter?style=for-the-badge"
            >
          </a>
        </p>
        <p>{{ $t('banner.description') }}</p>
        <p>
          <a
            class="btn btn-success btn-lg"
            :href="download"
            target="_blank"
            role="button"
            style="margin: 0 5px"
          >
            <i class="fa fa-download" /> {{ $t('banner.download') }}
          </a>
          <a
            class="btn btn-light btn-lg"
            :href="github"
            target="_blank"
            role="button"
          >
            <i class="fa fa-link" /> Github
          </a>
          <a
            class="btn btn-link"
            style="color: #fff; text-decoration: underline"
            :href="gitee"
            target="_blank"
            role="button"
          >Gitee</a>
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
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(255,255,255,0.7"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255,255,255,0.5)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(255,255,255,0.3)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="7"
            fill="#fff"
          />
        </g>
      </svg>
    </div>
    <div
      class="row bg"
      style="padding-top: 0"
    >
      <div class="col-md-10 offset-md-1">
        <h1 class="bd-title">
          <i class="fa fa-plane" /> {{ $t('block1.title1') }}
          <small class="text-muted">{{ $t('block1.title2') }}</small>
        </h1>
        <p class="lead">
          {{ $t('block1.title3') }}
        </p>
        <div
          class="alert alert-light"
          style="margin-top: 40px"
        >
          <code class="language-html">
            <pre>
1.{{ $t('block1.title4') }}:
  npm i vue-img-cutter@2 -S # For vue2
  npm i vue-img-cutter@3 -S # For vue3
            </pre>
          </code>
          <code class="language-html">
            <pre>2.{{ $t('block1.title5') }}: 
  import ImgCutter from 'vue-img-cutter';
  import 'vue-img-cutter/vue-img-cutter.css'; // v3
            </pre>
          </code>
          <code class="language-html">
            <pre>3.{{ $t('block1.title6') }} components: components: { ImgCutter }</pre>
          </code>
          <code class="language-html">
            <pre>4.{{ $t('block1.title7') }}: &lt;ImgCutter @cutDown="cutDown"&gt;&lt;/ImgCutter&gt;</pre>
          </code>
          <code class="language-html">
            <pre class="mb-0">5.{{ $t('block1.title8') }}: cutDown:(res) => { ...Do something }</pre>
          </code>
        </div>
      </div>
    </div>
    <div
      class="row bg grayBg"
      style="padding-bottom: 60px"
    >
      <div class="col-md-10 offset-md-1">
        <h1 class="bd-title">
          <i class="fa fa-cog" /> {{ $t('block2.title1') }}
          <small class="text-muted">{{ $t('block2.title2') }}</small>
        </h1>
        <p class="lead">
          {{ $t('block2.title3') }}
        </p>
        <div
          class="row"
          style="margin-top: 40px"
        >
          <div
            ref="imgCutterBox"
            class="col-md-6"
            style="height: 458px; overflow: hidden"
          >
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
                <div
                  class="btn btn-primary btn-block"
                  @click="pluginExe('handleOpen')"
                >
                  {{ params.label }}
                </div>
                <div
                  class="btn btn-secondary btn-block"
                  @click="forIe9"
                >
                  Crop remote pictures（For IE9+）
                </div>
              </div>
            </div>
            <ImgCutter
              v-if="refresh"
              ref="imgCutterModal"
              :cross-origin="params.crossOrigin"
              :label="params.label"
              :modal-title="params.modalTitle"
              :rate="params.rate"
              :index="params.index"
              :is-modal="params.isModal"
              :show-choose-btn="params.showChooseBtn"
              :lock-scroll="params.lockScroll"
              :box-width="params.boxWidth"
              :box-height="params.boxHeight"
              :cut-width="params.cutWidth"
              :cut-height="params.cutHeight"
              :size-change="params.sizeChange"
              :move-able="params.moveAble"
              :img-move="params.imgMove"
              :tool="params.tool"
              :file-type="params.fileType"
              :original-graph="params.originalGraph"
              :preview-mode="params.previewMode"
              :tool-box-overflow="params.toolBoxOverflow"
              :WatermarkText="params.WatermarkText"
              :WatermarkTextFont="params.WatermarkTextFont"
              :WatermarkTextColor="params.WatermarkTextColor"
              :WatermarkTextX="params.WatermarkTextX"
              :WatermarkTextY="params.WatermarkTextY"
              :small-to-upload="params.smallToUpload"
              :save-cut-position="params.saveCutPosition"
              :scale-able="params.scaleAble"
              :accept="params.accept"
              :after-choose-img="afterChooseImg"
              :DoNotDisplayCopyright="false"
              :tool-bgc="params.toolBgc"
              @on-choose-img="onChooseImg"
              @on-clear-all="onClearAll"
              @on-print-img="onPrintImg"
              @error="catchError"
              @cut-down="cutDown"
            >
              <template #open />
              <template
                v-if="params.isModal == false"
                #choose
              />
              <template
                v-if="params.isModal == false"
                #cancel
              />
              <template
                v-if="params.isModal == false"
                #confirm
              />
            </ImgCutter>
          </div>
          <div class="col-md-3">
            <div
              class="imgCutDownBox"
              :style="'height:458px;'"
            >
              <div class="imgCutDownBoxContainer">
                <img
                  v-if="!!imgSrc"
                  :src="imgSrc"
                  alt=""
                >
                <span
                  v-else
                  class="imgCutDownTips"
                >{{ $t('block3.title8') }}</span>
              </div>

              <div class="text-center">
                <a
                  :class="'btn btn-light' + (imgSrc ? '' : ' disabled')"
                  :disabled="!imgSrc"
                  :href="imgSrc"
                  :download="downloadName || 'image.jpg'"
                  role="button"
                >{{ $t('block3.title7') }}</a>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <form>
              <div class="form-group">
                <label for="cutImgSrc"> {{ $t('block3.title1') }}：</label>
                <input
                  type="text"
                  name="cutImgSrc"
                  class="form-control"
                  :value="cutImgSrc"
                  placeholder="Remote pictures src"
                  @input="catchInput($event)"
                >
              </div>
              <div class="form-group">
                <div
                  v-if="params.isModal === false"
                  class="btn btn-primary btn-block"
                  @click="pluginExe('chooseImg')"
                >
                  {{ params.label }}
                </div>
                <div
                  v-if="params.isModal === true"
                  class="btn btn-primary btn-block"
                  @click="pluginExe('handleOpen')"
                >
                  {{ params.label }}
                </div>
              </div>
              <div class="form-group">
                <div
                  class="btn btn-secondary btn-block"
                  @click="forIe9"
                >
                  {{ $t('block3.title3') }}
                </div>
              </div>
              <div class="form-group">
                <button
                  type="button"
                  :disabled="params.isModal === true || loadImg === false"
                  class="btn btn-success btn-block"
                  @click="pluginExe('cropPicture')"
                >
                  {{ $t('block3.title5') }}
                </button>
              </div>
              <div class="form-group">
                <button
                  type="button"
                  class="btn btn-light btn-block"
                  :disabled="params.isModal === true"
                  @click="pluginExe('clearAll')"
                >
                  {{ $t('block3.title6') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        class="col-md-10 offset-md-1"
        style="margin-top: 20px"
      >
        <div class="card">
          <div class="card-header">
            {{ $t('config.title') }}
          </div>
          <div class="card-body">
            <form autocomplete="off">
              <div class="row">
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="label">{{ $t('config.label') }}（label）：</label>
                    <input
                      v-model="params.label"
                      name="label"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="boxWidth">{{ $t('config.boxWidth') }}（boxWidth）：</label>
                    <input
                      v-model="params.boxWidth"
                      :readonly="params.isModal == false"
                      name="boxWidth"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="boxHeight">{{ $t('config.boxHeight') }}（boxHeight）：</label>
                    <input
                      v-model="params.boxHeight"
                      :readonly="params.isModal == false"
                      name="boxHeight"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="cutWidth">{{ $t('config.cutWidth') }}（cutWidth）：</label>
                    <input
                      v-model="params.cutWidth"
                      name="cutWidth"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="cutHeight">{{ $t('config.cutHeight') }}（cutHeight）：</label>
                    <input
                      v-model="params.cutHeight"
                      name="cutHeight"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="rate">{{ $t('config.rate') }}（rate）：</label>
                    <input
                      v-model="params.rate"
                      name="rate"
                      type="text"
                      class="form-control"
                      placeholder="eg：1:1"
                      @input="setData($event)"
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="toolBgc">{{ $t('config.toolBgc') }}（toolBgc）：</label>
                    <input
                      v-model="params.toolBgc"
                      name="toolBgc"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="crossOriginHeader">
                      {{ $t('config.crossOriginHeader') }}（crossOriginHeader）：</label>
                    <input
                      v-model="params.crossOriginHeader"
                      name="crossOriginHeader"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="crossOrigin">{{ $t('config.crossOrigin') }}（crossOrigin）：</label>
                    <select
                      name="crossOrigin"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option
                        value="true"
                        selected
                      >
                        YES
                      </option>
                      <option value="false">
                        NO
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="isModal">{{ $t('config.isModal') }}（isModal）：</label>
                    <select
                      name="isModal"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option value="true">
                        YES
                      </option>
                      <option
                        value="false"
                        selected
                      >
                        NO
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="showChooseBtn">
                      {{ $t('config.showChooseBtn') }}（showChooseBtn）：
                    </label>
                    <select
                      name="showChooseBtn"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option
                        value="true"
                        selected
                      >
                        YES
                      </option>
                      <option value="false">
                        NO
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="lockScroll">{{ $t('config.lockScroll') }}（lockScroll）：</label>
                    <select
                      name="lockScroll"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option
                        value="true"
                        selected
                      >
                        YES
                      </option>
                      <option value="false">
                        NO
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="sizeChange">{{ $t('config.sizeChange') }}（sizeChange）：</label>
                    <select
                      name="sizeChange"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option
                        value="true"
                        selected
                      >
                        YES
                      </option>
                      <option value="false">
                        NO
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="moveAble">{{ $t('config.moveAble') }}（moveAble）：</label>
                    <select
                      name="moveAble"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option
                        value="true"
                        selected
                      >
                        YES
                      </option>
                      <option value="false">
                        NO
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="tool">{{ $t('config.tool') }}（tool）：</label>
                    <select
                      name="tool"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option
                        value="true"
                        selected
                      >
                        YES
                      </option>
                      <option value="false">
                        NO
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="originalGraph">{{ $t('config.originalGraph') }}（originalGraph）：</label>
                    <select
                      name="originalGraph"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option value="true">
                        YES
                      </option>
                      <option
                        value="false"
                        selected
                      >
                        NO
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="saveCutPosition">{{ $t('config.saveCutPosition') }}（ saveCutPosition ）：</label>
                    <select
                      name="saveCutPosition"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option
                        value="true"
                        selected
                      >
                        YES
                      </option>
                      <option value="false">
                        NO
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="scaleAble">{{ $t('config.scaleAble') }}（ scaleAble ）：</label>
                    <select
                      name="scaleAble"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option
                        value="true"
                        selected
                      >
                        YES
                      </option>
                      <option value="false">
                        NO
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="imgMove">{{ $t('config.imgMove') }}（ imgMove ）：</label>
                    <select
                      name="imgMove"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option
                        value="true"
                        selected
                      >
                        YES
                      </option>
                      <option value="false">
                        NO
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="fileType">{{ $t('config.fileType') }}（ fileType ）：</label>
                    <input
                      v-model="params.fileType"
                      name="fileType"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="index">{{ $t('config.index') }}（index）：</label>
                    <input
                      v-model="params.index"
                      name="index"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="smallToUpload">
                      {{ $t('config.smallToUpload') }} （smallToUpload ）：</label>
                    <select
                      name="smallToUpload"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option value="true">
                        YES
                      </option>
                      <option
                        value="false"
                        selected
                      >
                        NO
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="toolBoxOverflow">
                      {{ $t('config.toolBoxOverflow') }}（toolBoxOverflow）：
                    </label>
                    <select
                      name="toolBoxOverflow"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option
                        value="true"
                        selected
                      >
                        YES
                      </option>
                      <option value="false">
                        NO
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="previewMode">{{ $t('config.previewMode') }}（previewMode）：</label>
                    <select
                      name="previewMode"
                      class="custom-select"
                      @change="setData($event)"
                    >
                      <option
                        value="true"
                        selected
                      >
                        YES
                      </option>
                      <option value="false">
                        NO
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="WatermarkText">{{ $t('config.WatermarkText') }}（WatermarkText）：</label>
                    <input
                      v-model="params.WatermarkText"
                      name="WatermarkText"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="WatermarkTextFont">{{ $t('config.WatermarkTextFont') }}（WatermarkTextFont）：</label>
                    <input
                      v-model="params.WatermarkTextFont"
                      name="WatermarkTextFont"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="WatermarkTextColor">{{ $t('config.WatermarkTextColor') }}（WatermarkTextColor）：</label>
                    <input
                      v-model="params.WatermarkTextColor"
                      name="WatermarkTextColor"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="WatermarkTextX">{{ $t('config.WatermarkTextX') }}（WatermarkTextX）：</label>
                    <input
                      v-model="params.WatermarkTextX"
                      name="WatermarkTextX"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="WatermarkTextY">{{ $t('config.WatermarkTextY') }}（WatermarkTextY）：</label>
                    <input
                      v-model="params.WatermarkTextY"
                      name="WatermarkTextY"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="quality">{{ $t('config.quality') }}（quality）：</label>
                    <input
                      v-model="params.quality"
                      name="WatermarkTextFont"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="accept">{{ $t('config.accept') }}（accept）：</label>
                    <input
                      v-model="params.accept"
                      name="accept"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="form-group custom-control">
                    <label for="modalTitle">{{ $t('config.modalTitle') }}（modalTitle）：</label>
                    <input
                      v-model="params.modalTitle"
                      name="modalTitle"
                      type="text"
                      class="form-control"
                      @input="setData($event)"
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div
          class="row"
          style="margin-top: 20px"
        >
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                HTML
              </div>
              <div class="card-body">
                <pre>
                <code>{{ code1 }}</code>
              </pre>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                Javascript
              </div>
              <div
                class="card-body"
                style="height: 623px"
              >
                <pre>
                <code>{{ code2 }}</code>
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
          <i class="fa fa-magic" /> {{ $t('donation.title1') }}
          <small class="text-muted">{{ $t('donation.title2') }}</small>
        </h1>
        <p class="lead">
          {{ $t('donation.title3') }}
        </p>
      </div>
      <div
        class="col-md-10 offset-md-1"
        style="margin-top: 20px"
      >
        <div class="alipay">
          <div>
            <img
              src="https://ihtmlcss.oss-cn-chengdu.aliyuncs.com/2020/01/weixinpay.png"
              alt="捐赠"
            >
          </div>
          <div class="text-center">
            微信 Wechat
          </div>
        </div>
        <div class="alipay">
          <div>
            <img
              src="https://ihtmlcss.oss-cn-chengdu.aliyuncs.com/2020/01/alipay.png"
              alt="捐赠"
            >
          </div>
          <div class="text-center">
            支付宝 Alipay
          </div>
        </div>
      </div>
    </div>
    <div
      class="row bg grayBg"
      style="padding-bottom: 20px; margin-top: 50px"
    >
      <div class="col">
        <blockquote class="blockquote text-center">
          <p class="mb-0">
            {{ name }} {{ version }}
            <a
              :href="github"
              class="font-weight-lighter"
              style="margin: 0 5px"
            >{{
              $t('introduce.github')
            }}</a>
            <a
              :href="gitee"
              class="font-weight-lighter"
              style="margin: 0 5px"
            >{{
              $t('introduce.gitee')
            }}</a>
            <a
              :href="npm"
              class="font-weight-lighter"
              style="margin: 0 5px"
            >{{ $t('introduce.npm') }}</a>
          </p>
          <footer>
            <small>
              <a
                :href="homepage"
                class="font-weight-lighter"
              >{{ $t('introduce.homepage') }}</a>
            </small>
          </footer>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import config from '../package.json';
import ImgCutter from './components/ImgCutter.vue';

const { t, locale } = useI18n();

interface Params {
    modalTitle: string;
    label: string;
    fileType: string;
    crossOrigin: boolean;
    crossOriginHeader: string;
    rate: string;
    toolBgc: string;
    isModal: boolean;
    showChooseBtn: boolean;
    saveCutPosition: boolean;
    scaleAble: boolean;
    lockScroll: boolean;
    toolBoxOverflow: boolean;
    quality: number;
    boxWidth: number;
    boxHeight: number;
    cutWidth: number;
    cutHeight: number;
    sizeChange: boolean;
    moveAble: boolean;
    imgMove: boolean;
    tool: boolean;
    originalGraph: boolean;
    WatermarkText: string;
    WatermarkTextFont: string;
    WatermarkTextColor: string;
    WatermarkTextX: number;
    WatermarkTextY: number;
    smallToUpload: boolean;
    previewMode: boolean;
    index: string;
    accept: string;
}

// Refs for template
const imgCutterBox = ref<HTMLElement | null>(null);
const imgCutterModal = ref<any>(null);

// Reactive state
const name = ref(config.name);
const version = ref(config.version);
const author = ref(config.author);
const description = ref(config.description);
const banner = ref('https://i.picsum.photos/id/743/1920/500.jpg');
const github = ref('https://github.com/acccccccb/vue-img-cutter');
const gitee = ref('https://gitee.com/GLUESTICK/vue-img-cutter');
const download = ref('https://github.com/acccccccb/vue-img-cutter/archive/master.zip');
const cutImgSrc = ref('https://phpcrm-oss.oss-cn-chengdu.aliyuncs.com/weixinpay.png');
const homepage = ref('https://www.ihtmlcss.com');
const docs = ref('https://github.com/acccccccb/vue-img-cutter/blob/master/README.md');
const npm = ref('https://www.npmjs.com/package/vue-img-cutter');
const imgSrc = ref('');
const downloadName = ref('');
const refresh = ref(true);
const loadImg = ref(false);
const code1 = ref('');

const params = reactive<Params>({
    modalTitle: t('block3.title10'),
    label: t('block3.title9'),
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
    quality: 1,
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
    accept: 'image/gif, image/jpeg ,image/png',
});

const code2 = ref(
    '\n' +
    '// ' +
    t('block3.title4') +
    '\n' +
    'forIe9:() => {\n' +
    '   this.$refs.imgCutterModal.handleOpen({\n' +
    '       name:1.png,\n' +
    '       src:http://imgurl.com/1.png,\n' +
    '   });\n' +
    '}'
);

// Methods
const createCode = () => {
    code1.value =
        '\n' +
        '<ImgCutter\n' +
        '   ref="imgCutterModal"\n' +
        '   modalTitle="' +
        params.modalTitle +
        '"\n' +
        '   label="' +
        params.label +
        '"\n' +
        '   fileType="' +
        params.fileType +
        '"\n' +
        '   :crossOrigin="' +
        params.crossOrigin +
        '"\n' +
        '   crossOriginHeader="' +
        params.crossOriginHeader +
        '"\n' +
        '   rate="' +
        params.rate +
        '"\n' +
        '   toolBgc="' +
        params.toolBgc +
        '"\n' +
        '   :isModal="' +
        params.isModal +
        '"\n' +
        '   :showChooseBtn="' +
        params.showChooseBtn +
        '"\n' +
        '   :lockScroll="' +
        params.lockScroll +
        '"\n' +
        '   :boxWidth="' +
        params.boxWidth +
        '"\n' +
        '   :boxHeight="' +
        params.boxHeight +
        '"\n' +
        '   :cutWidth="' +
        params.cutWidth +
        '"\n' +
        '   :cutHeight="' +
        params.cutHeight +
        '"\n' +
        '   :sizeChange="' +
        params.sizeChange +
        '"\n' +
        '   :moveAble="' +
        params.moveAble +
        '"\n' +
        '   :imgMove="' +
        params.imgMove +
        '"\n' +
        '   :originalGraph="' +
        params.originalGraph +
        '"\n' +
        '   WatermarkText="' +
        params.WatermarkText +
        '"\n' +
        '   WatermarkTextFont="' +
        params.WatermarkTextFont +
        '"\n' +
        '   WatermarkTextColor="' +
        params.WatermarkTextColor +
        '"\n' +
        '   :WatermarkTextX="' +
        params.WatermarkTextX +
        '"\n' +
        '   :WatermarkTextY="' +
        params.WatermarkTextY +
        '"\n' +
        '   :smallToUpload="' +
        params.smallToUpload +
        '"\n' +
        '   :saveCutPosition="' +
        params.saveCutPosition +
        '"\n' +
        '   :scaleAble="' +
        params.scaleAble +
        '"\n' +
        '   :previewMode="' +
        params.previewMode +
        '"\n' +
        '   :quality="' +
        params.quality +
        '"\n' +
        '   :accept="' +
        params.accept +
        '"\n' +
        '   :toolBoxOverflow="' +
        params.toolBoxOverflow +
        '"\n' +
        '   :index="' +
        params.index +
        '"\n' +
        '   @cutDown="cutDown">\n' +
        '   @error="catError">\n' +
        '       <div class="btn btn-primary" #open>' +
        params.label +
        '</div>\n' +
        '</ImgCutter>';
};

const doRefresh = () => {
    refresh.value = false;
    nextTick(() => {
        refresh.value = true;
    });
};

const afterChooseImg = (res: any) => {
    console.log('afterChooseImg', res);
    return new Promise<boolean>((resolve) => {
        resolve(true);
    });
};

const cutDown = (res: any) => {
    console.log('cutDown', res);
    imgSrc.value = res.dataURL;
    downloadName.value = res.fileName;
};

const forIe9 = () => {
    imgCutterModal.value?.handleOpen({
        name: cutImgSrc.value,
        src: cutImgSrc.value,
    });
};

const onClearAll = () => {
    loadImg.value = false;
    imgSrc.value = '';
};

const onPrintImg = (res: any) => {
    imgSrc.value = res.dataURL;
};

const onChooseImg = (res: any) => {
    if (res) {
        loadImg.value = true;
    }
};

const setData = ($event: any) => {
    function isNumber(val: any) {
        let regPos = /^\d+(\.\d+)?$/;
        let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
        return regPos.test(val) || regNeg.test(val);
    }

    let value = $event.target.value;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    if (isNumber(value)) value = parseInt(value);

    (params as any)[$event.target.name] = value;
    doRefresh();
    createCode();
};

const catchInput = (e: any) => {
    let val = e.target.value;
    let key = e.target.name;
    if (key === 'cutImgSrc') {
        cutImgSrc.value = val;
    }
};

const catchError = (res: any) => {
    console.log(res);
    window.alert(res.msg);
};

const pluginExe = (functionName: string) => {
    imgCutterModal.value?.[functionName]();
};

const changeLocale = (lang: 'zh-CN' | 'en-US') => {
    locale.value = lang;
};

onMounted(() => {
    if (imgCutterBox.value) {
        params.boxWidth = imgCutterBox.value.offsetWidth - 30;
    }
    createCode();
});
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
